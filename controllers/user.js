import { parseInt } from "lodash";
import User from "../models/user";
import _ from "lodash";
// Lấy id chung
export const userById = (req, res, next, id) => {
    User.findById(id).exec((error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "Không tìm thấy user",
            });
        }
        req.profile = data;
        next();
    });
};

// show list user
export const showListUser = async (req, res) => {
    // let page = req.query.page;
    // const page_size = 2;
    // if (page) {
    //     page = parseInt(page);
    //     if (page < 1) {
    //         page = 1;
    //     }

    //     const qtySkip = (page - 1) * page_size;
    //     User.find({})
    //         .sort({ _id: -1 })
    //         .skip(qtySkip)
    //         .limit(page_size)
    //         .exec((err, listUser) => {
    //             if (err) {
    //                 return res.status(400).json({
    //                     success: false,
    //                     message: "Không tìm thấy user nào ",
    //                 });
    //             }

    //             User.countDocuments({}).then((total) => {
    //                 const totalPage = Math.ceil(total / page_size);

    //                 res.status(200).json({
    //                     success: true,
    //                     message: "OK",
    //                     totalPage,
    //                     listUser,
    //                 });
    //             });
    //         });
    // } else {
    //     if (req.query.username) {
    //         User.find({ username: req.query.username }, function (err, data) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.json(data);
    //             }
    //         })
    //     } else {
    //         User.find({}).then((user) => {
    //             user = user.map((user) => user.toObject());
    //             res.json(user);
    //         })
    //             .catch(next);
    //     }
    // }
    
    const sortBy = {};
    const { page, limit, sort } = req.query;
    if (page && limit) {
        const myCustomTables = {
            totalDocs: "itemCount",
            docs: 'users',
            limit: "perPage",
            page: "currentPage",
            nextPage: "next",
            prevPage: "prev",
            totalPages: "pageCount",
            pagingCounter: "slNo",
            meta: "paginator",
        };
        const options = {
            page: page || 1,
            limit: limit || 2,
            customLabels: myCustomTables,
            collation: {
                locale: "en",
            },
        };

        User.paginate({}, options, function (err, db) {
            if (err) throw err;
            else res.json(db.users);
            console.log(`page: ${limit}, limit: ${limit}`);
        });

    } else if (limit) {
        const users = await User.find({}).limit(parseInt(limit));
        console.log(`page: ${limit}`);
        res.json(users);
    } else if (sort) {
        const str = req.query.sort.split(":");
        sortBy[str[0]] = str[1] === "desc" ? -1 : 1;
        const users = await User.find({}).sort(sort);
        res.json(users);
    } else {
        if (req.query.username) {
            User.find({ username: req.query.username }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(data);
                }
            })
        } else {
            User.find({}).then((user) => {
                user = user.map((user) => user.toObject());
                res.json(user);
            }).catch(next);
        }
    }

};

// detail user
export const detailUser = (req, res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

//edit user
export const editUser = (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, data) => {
            if (err) {
                return res.status(401).json({
                    error: "cannot update user !!"
                })
            }
            req.profile.hashed_password
            req.profile.salt
            res.json(data)
        }
    );
};

// delete user
export const removeUser = (req, res) => {
    let user = req.profile;
    user.remove((err, db) => {
        if (err) {
            res.status(401).json({
                status: false,
                err: "Không thể xoá user !!"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Xoá thành công user",
            db
        })
    })
}
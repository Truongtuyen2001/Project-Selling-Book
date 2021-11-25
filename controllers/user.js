import User from "../models/user";


// Lấy id chung
export const userById = (req, res, next, id) => {
    User.findById(id).exec((error, data) => {
        if(error || !data) {
            return res.status(400).json({
                error : "Không tìm thấy user",
            });
        }
        req.profile = data;
        next();
    });
};

// show list user
export const showListUser = (req, res, next ) => {
    if(req.query.username) {
        User.find({username: req.query.username}, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
    } else {
        User.find({}).then((user) => {
            user = user.map((user) => user.toObject());
            res.json(user);
        })
        .catch(next);
    }
};

// detail user
export const detailUser = (req,res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

//edit user
export const editUser = (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        {$set : req.body},
        {new :true},
        (err, data) => {
            if(err) {   
                return res.status(401).json({
                    error : "cannot update user !!"
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
        if(err) {
            res.status(401).json({
                status: false,
                err : "Không thể xoá user !!"
            })
        }
        return res.status(200).json({
            status: true,
            message : "Xoá thành công user",
            db
        })
    })
}
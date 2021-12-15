import Book from "../models/book";
import _, { parseInt } from "lodash";
import { fromidable } from 'formidable';
import fs, { copyFileSync } from 'fs';

export const addBook = (req, res) => {
    const { name, price, image, description, status, author, discount, quantity } = req.body;
    if (!name || !price || !image || !description || !status || !author || !discount || !quantity) {
        return res.status(401).json({
            status: false,
            error: "Bạn cần nhập đầy đủ thông tin sách !!"
        })
    } else {
        const book = new Book(req.body);
        book.save((err, book) => {
            if (err) {
                res.status(402).json({
                    err: "Không thể thêm thông tin sách !!"
                })
            }
            return res.json(book)
        })
    }
}

export const listBook = async (req, res) => {

    // const sortBy = {};
    // const { page, limit, sort } = req.query;
    // if (page && limit) {
    //     const myCustomTables = {
    //         totalDocs: "itemCount",
    //         docs: "books",
    //         limit: "perPage",
    //         page: "currentPage",
    //         nextPage: "next",
    //         prevPage: "prev",
    //         totalPages: "pageCount",
    //         pagingCounter: "slNo",
    //         meta: "paginator",
    //     };
    //     const options = {
            
    //         page: page || 1,
    //         limit: limit || 5,
    //         customLabels: myCustomTables,
    //         collation: {
    //             locale: 'en',
    //         },
    //     };

    //     Book.paginate({}, options, function (err, db) {
    //         if (err) throw err;
    //         else res.json(db.books);
    //         console.log(`page: ${page}, limit: ${limit}`);
    //     });
    // } 
    

    let page = req.query. page;
    const page_size = 5;
    if(page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }

        const qtySkip = (page - 1) * page_size;
        Book.find({})
            .sort({ _id: -1})
            .skip(qtySkip)
            .limit(page_size)
            .exec((err, listBook) => {
                if(err) {
                    return res.status(400).json({
                        success: false,
                        error: "Không tìm thấy user nào",
                    });
                }

                Book.countDocuments({}).then((total) => {
                    const totalPage = Math.ceil(total / page_size);
                    res.status(200).json({
                        listBook, 
                        totalPage,
                        totalBook: total,
                    })
                })
            })
    } else {
        const products = await Book.find({}).populate('cateId')
            .sort({ createAt: -1 }).exec();
        res.json(products);
    }
}

// export const totalBook = async (req, res) => {
//     const total = await Book.find().populate('cateId');
//     if(!total) {
//         return res.status(400).json({
//             status: false,
//             message: "Không tìm thấy sách"
//         });
//     }
//     res.status(200).json({
//         status: true,
//         message: "Lấy danh sách sản phẩm thành công",
//         total,
//     });
// }

export const bookById = (req, res, next, id) => {
    Book.findById(id).exec((err, book) => {
        if (err) {
            res.status(400).json({
                err: "Không tìm thấy sách"
            })
        }
        req.book = book;
        next();
    })
}

export const detailBook = (req, res) => {
    return res.json(req.book)
}

export const updateBook = (req, res) => {
    let book = req.book
    book = _.assignIn(book, req.body);

    book.save((err, book) => {
        if (err) {
            return res.status(401).json({
                err: "Error !!"
            })
        }
        return res.json(book)
    })
}

export const removeBook = (req, res) => {
    let book = req.book;
    book.remove((err, book) => {
        if (err) {
            return res.status(400).json({
                status: false,
                err: "Không thể xoá được sản phẩm"
            });
        };
        return res.json(book)
    })
}

// sản phẩm liên quan
export const listRelated = (req, res) => {
    Book.find({
        _id: { $ne: req.product },
        category_id: req.product.category_id._id,
    }).limit(4).populate('cateId', '_id name').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: "Không tìm thấy sản phẩm nào"
            })
        }
        res.status(200).json(data)
    })
}

// tìm kiếm sản phẩm theo name
export const searchProduct = (req, res) => {
    const searchProduct = req.query.name;
    Book.find({ name: { $regex: searchProduct, $options: "i" } }).exec((err, book) => {
        if (err || !book) {
            return res.status(400).json({
                success: false,
                message: "Lỗi vcl",
            });
        }
        return res.status(200).json(book);
    });
};



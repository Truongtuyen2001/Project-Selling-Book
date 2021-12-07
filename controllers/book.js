import Book from "../models/book";
import _ from "lodash";
import { fromidable } from 'formidable';
import fs from 'fs';

export const addBook = (req, res) => {
    const { name, price, image, description, status, author } = req.body;
    if (!name || !price || !image || !description || !status || !author) {
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

// export const listBook = (req, res) => {
//     Book.find((err, book) => {
//         if (err || !book) {
//             return res.status(400).json({
//                 err: "Không thể hiển thị được danh sách"
//             })
//         }
//         return res.json(book)
//     })
// }

export const listBook = async (req, res) => {
    const products = await Book.find({})
        .populate('cateId')
        .sort({ createAt: -1 }).exec();
    res.json(products);
}

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
    }).limit(4).populate('category_id', '_id name').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: "Không tìm thấy sản phẩm nào"
            })
        }
        res.status(200).json(data)
    })
}

// tìm kiếm sản phẩm
export const searchProduct = (req, res) => {
    
    const searchProduct = req.query.name;
    Book.find({ name: { $regex: searchProduct, $options: "i" } }).exec((err, book) => {
        if (err || !book) {
            return res.status(400).json({
                success: false,
                message: "Lỗi vcl",
            });
        }
        return res.status(200).json({
            success: true,
            book
        });
    });
};
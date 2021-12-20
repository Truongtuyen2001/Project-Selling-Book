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
    let page = req.query.page;
    const page_size = 12;
    if (page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }
        const qtySkip = (page - 1) * page_size;
        Book.find({}).populate('cateId')
            .sort({ createAt: -1 })
            .skip(qtySkip)
            .limit(page_size)
            .exec((err, listBook) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: "Không tìm thấy quyển sách nào",
                    });
                }

                Book.countDocuments({}).then((total) => {
                    const totalPage = Math.ceil(total / page_size);
                    res.status(200).json({
                        totalPage,
                        totalBook: total,
                        listBook,
                    });
                });
            });
    } else {

    }
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
    let page = req.query.page;
    const searchProduct = req.query.name;
    const page_size = 12;
    if (page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }
        const qtySkip = (page - 1) * page_size;
        Book.find({ name: { $regex: searchProduct, $options: "i" }})
            .populate('cateId')
            .sort({ createAt: -1 })
            .skip(qtySkip)
            .limit(page_size)
            .exec((err, searchProduct) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: "Error"
                    });
                }
                Book.countDocuments({}).then((total) => {
                    const totalPage = Math.ceil(total / page_size);
                    res.status(200).json({
                        // totalPage,
                        searchProduct
                    })
                })
            })
    } else {

    }
};



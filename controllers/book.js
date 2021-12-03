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

export const listBook = (req, res) => {
    Book.find((err, book) => {
        if (err || !book) {
            return res.status(400).json({
                err: "Không thể hiển thị được danh sách"
            })
        }
        return res.json(book)
    })
}
    
export const bookById = (req, res, next , id) => {
    Book.findById(id).exec((err, book) => {
        if(err) {
            res.status(400).json({
                err : "Không tìm thấy sách"
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
        if(err) {
            return res.status(401).json({
                err : "Error !!"
            })
        }
        return res.json(book)
    })
}

export const removeBook = (req, res) => {
    let book = req.book;
    book.remove((err, book) => {
        if(err) {
            return res.status(400).json({
                status: false,
                err : "Không thể xoá được sản phẩm"
            });
        };
        return res.json(book)
    })
}

export const listRelated = (req, res) => {
    Book.find({
        _id : {$ne: req.book},
        cateId: req.book.cateId,
    }).populate('category', "_id name")
    .exec((err, book) => {
        if(err) {
            res.status(400).json({
                error : "Product not found",
            })
        }
        res.json(book)
    })
}
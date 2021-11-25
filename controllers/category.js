import Categories from "../models/category";
import _ from 'lodash';

// Add Category book
export const addCategories = (req, res) => {
    const category = new Categories(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(401).json({
                err: "Không thêm được danh mục"
            })
        } else {
            return res.json({
                status: true,
                message: "Thêm danh mục thành công",
                data
            })
        }
    })
}

// show list categories
export const showListCate = (req, res, next) => {
    Categories.find({}).then((categories) => {
        categories.map((categories) => categories.toObject());
        return res.json({
            message: "Lấy danh mục thành công",
            categories
        });
    }).catch(next);
}

// Lấy id
export const categoryId = (req, res, next, id) => {
    Categories.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(401).json({
                err: "Không lấy được sản phẩm !"
            })
        }
        req.category = category;
        next();
    });
}

//update category
export const updateCategories = (req, res) => {
    const category = _.assignIn(req.category, req.body);
    category.save((err, db) => {
        if (err) {
            res.status(403).json({
                err: "Không thể cập nhật danh mục !!",
            })
        } else {
            return res.status(200).json({
                message: "Cập nhật danh mục sách thành công",
                db
            })
        }
    })
}

//Detail cate
export const cateDetail = (req, res) => {
    return res.json(req.category)
}

//Delete category
export const removeCategories = (req, res, next) => {
    let category = req.body;
    category.remove((err, data) => {
        if(err || !data) {
            return res.status(401).json({
                error : "Không thể xoá danh mục !!"
            })
        }else {
            return res.status(200).json({
                message : "Xoá thành công danh mục",
                data
            })
        }
    })
}

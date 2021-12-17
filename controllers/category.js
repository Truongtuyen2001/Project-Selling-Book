import Categories from "../models/category";
import _ from 'lodash';

// Add Category book
export const addCategories = (req, res) => {
    const category = new Categories(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(401).json({
                err: "Không thêm được danh mục"
            })
        } else {
            return res.json(category)
        }
    })
}

// show list categories
export const showListCate = (req, res, next) => {
    Categories.find({}).then((categories) => {
        categories.map((categories) => categories.toObject());
        return res.json(categories);
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
    category.save((err, category) => {
        if (err) {
            res.status(403).json({
                err: "Không thể cập nhật danh mục !!",
            })
        } else {
            return res.status(200).json(category)
        }
    })
}

//Detail cate
export const cateDetail = (req, res) => {
    return res.json(req.category)
}

//Delete category
export const removeCategories = (req, res, next) => {
    let category = req.category;

    category.remove((err, category) => {
        if(err) {
            return res.status(401).json({
                err : "Error"
            })
        }
        res.status(200).json(category)
    })
}

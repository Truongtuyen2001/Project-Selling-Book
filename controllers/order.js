import Order from '../models/order';
import formidable from 'formidable';

export const orderById = (req, res, next, id) => {
    Order.findbyId(id).exec((err, order) => {
        if(err || !data) {
            return res.status(400).json({
                status: false,
                error : "Không có order"
            })
        }
        req.order = order;
        next();
    })
}

export const addOrder = (req, res) => {
    let order = new Order(req.body);
    order.save((err, order) => {
        if(err) {
            return res.status(401).json({
                status :false,
                err: "Không thêm được order"
            })
        }
        return res.status(200).json(order);
    })
}

export const listOrder = (req, res) => {
    Order.find((err, order) => {
        if(err) {
            return res.status(403).json({
                status : false,
                error : "Lỗi vkl"
            })
        }
        return res.status(200).json(order)
    })
}

export const detailOrder = (req, res) => {
    return res.json(req.order);
}

export const removeOrder = (req, res) => {
    let order = req.order;
    order.remove((err, order) => {
        if(err || !order) {
            return res.status(400).json({
                status: false,
                error : "Error"
            })
        }
        return res.json(order);
    })
}

export const updateOrder = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, files) => {
        if(err) {
            res.status(400).json({
                error : "Error"
            })
        }
    
        const { productId, userId, address, nameKh, phone, totalMoney } = fildes;
        if(!nameKh || !phone || !totalMoney || !address || !productId || userId ) {
            return res.status(400).json({
                error : "Cần nhập đầy đủ thông tin các trường"
            })
        }
        let order = req.order
        order.save((err, data) => {
            if(err) {
                return res.status(400).json({
                    status : false,
                    error : "Error"
                })
            }
            res.json(data)
        })
    })
}

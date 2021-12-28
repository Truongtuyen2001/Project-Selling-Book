import Order from '../models/order';
import formidable from 'formidable';
import _ from 'lodash';
import express, { response } from 'express';

export const orderById = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return response.status(400).json({
                status: false,
                error: "Không có order"
            })
        }
        req.order = order;
        next();
    })
}

export const addOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: " Không thể mua hàng"
            });
        }
        return res.json(data)
    })
}

export const listOrder = async(req, res) => {

    const order = await Order.find({})
        .populate('arrOrder')
        .sort({ createAt: -1 }).exec();
    res.json(order);
}

export const detailOrder = (req, res) => {
    return res.json(req.order);
}

export const removeOrder = (req, res) => {
    let order = req.order;
    order.remove((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                status: false,
                error: "Error"
            })
        }
        return res.json(order);
    })
}

export const updateOrder = (req, res) => {

    let order = req.order
    order = _.assignIn(order, req.body);

    order.save((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "Error!!"
            })
        }
        return res.json(order)
    })
}


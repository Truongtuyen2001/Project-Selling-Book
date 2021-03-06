import Cart from '../models/cart';
import _ from 'lodash';

export const addCart = (req, res) => {
    const { idUser, idBook } = req.body;
    if (!idUser || !idBook) {
        return res.status(400).json({
            status: false,
            error: "Không được để trống !!"
        })
    } else {
        const cart = new Cart(req.body);
        cart.save((err, cart) => {
            if (err, !cart) {
                return res.status(401).json({
                    err: "Không thể thêm vào giỏ hàng"
                })
            }
            return res.status(200).json(cart);
        })
    }
}

export const listCart = async (req, res) => {
    const carts = await Cart.find({})
        .populate('idBook')
        .sort({ createAt: -1 }).exec();
    res.json(carts);
}

export const idCart = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if(err) {
            return res.status(400).json({
                status: false,
                error : "Lỗi nhá em ơi"
            });
        }
        req.cart = cart;
        next();
    })
}

export const  updateCart = (req, res) =>{

    let cart = req.cart
    cart = _.assignIn(cart,req.body)
    cart.save((err,data) =>{
        if(err){
            return res.status(400).json({
                err : " Sửa Thất bại !"
            })
        }
        res.json(data)
    })
}

export const removeCart = (req, res) => {
    let cart = req.cart
    cart.remove((err, db) => {
        if (err) {
            return res.status(400).json({
                err: "Không xóa được Cart"
            })
        }
        res.json(db)
    })
}


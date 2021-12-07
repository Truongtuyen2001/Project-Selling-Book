import express from 'express';
const cartRouters = express.Router();
import { addCart, listCart, idCart, updateCart, removeCart } from '../controllers/cart';

cartRouters.post('/addCart', addCart);
cartRouters.get('/listCart', listCart);
cartRouters.patch('/updateCart/:idCart', updateCart);
cartRouters.delete('/deleteCart/:idCart', removeCart);
cartRouters.param('idCart', idCart)
module.exports = cartRouters;
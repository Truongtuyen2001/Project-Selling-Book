import express, { Router } from 'express';
const cartRouters = express.Router();
import { addCart , listCart, idCart ,updateCart, removeCart} from '../controllers/cart';

cartRouters.post('/addCart', addCart);
cartRouters.get('/listCart/:idUser', listCart);
cartRouters.param('idCart', idCart);
cartRouters.patch('/updateCart/:idCart', updateCart);
cartRouters.delete('/deleteCart/:idCart', removeCart);

module.exports = cartRouters;
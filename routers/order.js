import express from 'express';
import { orderById, addOrder, listOrder, detailOrder, removeOrder, updateOrder } from '../controllers/order';
const orderRouter = express.Router();

orderRouter.param('orderId', orderById);
orderRouter.post('/addOrder', addOrder);
orderRouter.get('/listOrder', listOrder)
orderRouter.get('/detailOrder/:orderId', detailOrder);
orderRouter.delete('/removeOrder/:orderId', removeOrder);
orderRouter.patch('/updateOrder/:orderId', updateOrder)

module.exports = orderRouter;
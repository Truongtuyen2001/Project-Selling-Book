import express, { Router } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import bookRouters from './routers/book';
import cateRouters from './routers/category';
import authRouters from './routers/auth';
import userRouters from './routers/user';
import orderRouter from './routers/order';
import cartRouters from './routers/cart';
import wishList from './routers/wishList';
import couponRouter from './routers/coupon';
//config

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//middleware
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
})

app.use(cors({
    origin: '*',
    credentials: true
}))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log(`DB Connected`);
})
mongoose.connection.on("Error", err => {
    console.log(`DB connect failed ${err.message}`);
})

app.use('/api', bookRouters);
app.use('/api', cateRouters);
app.use('/api', authRouters);
app.use('/api', userRouters);
app.use('/api', orderRouter);
app.use('/api', cartRouters);
app.use('/api', couponRouter);
app.use('/api', wishList);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})


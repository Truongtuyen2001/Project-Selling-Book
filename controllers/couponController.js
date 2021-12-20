import Coupon from '../models/couponModels';
import md5 from 'md5';

export const createCoupon = (req, res) => {
    const { nameCode, bookId, status, startDate, endDate, value } = req.body;
    if(!nameCode || !bookId || !status || !startDate || !endDate || !value) {
        return res.status(403).json({
            status: false,
            error: "Bạn cần nhập đầy đủ thông tin !!"
        })
    } else {
        const newCoupon = new Coupon(req.body);
        if(!newCoupon.nameCode)
            newCoupon.nameCode = md5(Date.now() + Math.random());
        newCoupon.nameCode = newCoupon.nameCode.toUpperCase();
        newCoupon.save(function (err) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json(cleanUpCoupon(newCoupon));
            };
        });
    }
}
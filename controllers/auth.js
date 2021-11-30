import User from '../models/user';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { check, validationResult } from 'express-validator'
dotenv.config();

export const userValidationResult = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const error = result.array()[0].msg
        return res.status(422).json({
            success: false,
            error: error
        })
    }
    next();
}

//validate kí tự 
export const Validate = [
    check('name').trim().not().isEmpty().withMessage("Name is required").isLength({ min: 3, max: 30 })
        .withMessage("Tên phải dài từ 3 đến 30 kí tự !"),

    check('email').trim().not().isEmpty().withMessage("Email is required")
        .matches('^[A-Za-z0-9]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')
        .withMessage("Email không đúng định dạng. Email chứa kí tự chữ cái và số !!"),

    check('phone').trim().not().isEmpty().withMessage("Phone is required")
        .matches('^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$')
        .withMessage("Số điện thoại không đúng định dạng hoặc không đúng đầu số của VN !!"),

    check('password').trim().not().isEmpty().withMessage('Password is required').isLength({ min: 8 })
        .withMessage('Mật khẩu phải nhập dài ít nhất 8 ký tự !')
]

//check mail tồn tại
export const checkMail = (req, res, next) => {
    const email= req.body;
    User.findOne(email).exec((err, data) => {
        if (err || data) {
            return res.status(400).json({
                status: false,
                error: "Email đã tồn tại. Vui lòng đăng kí gmail khác !!"
            })
        }
        next();
    })
}

// Register
export const register = (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone ) {
        return res.status(400).json({
            status: false,
            error: "Bạn cần nhập đầy đủ thông tin"
        })
    } else {
        const user = new User(req.body);
        user.save((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Không thể đăng kí tài khoản",
                })
            }
            return res.status(200).json(user)
        })
    }
}

// Signin
export const signin = (req, res) => {
    const { _email, _password } = req.body;
    if ( _email && _password ) {
        User.findOne({ email: _email }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    err: "Tài khoản không tồn tại ! Vui lòng đăng kí "
                });
            };
            if (!user.authenticate(_password)) {
                return res.status(401).json({
                    error: "Email hoặc mật khẩu không đúng !!",
                });
            }

            const token = jwt.sign({ _id: user.id, role: user.role }, process.env.JWT_SECRET);
            res.cookie('tokenAccess', token, { expire: new Data() + 9999 });
            const { _id, name, email, role } = user;
            return res.json({
                token, id: _id, name: name, email: email, role: role
            });
        });
    } else {
        const { email, password } = req.body;
        User.findOne({ email }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    error: "User with that email does not exit. Please signup"
                });
            }
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: "Email and password not match"
                });
            }
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
            const { _id, name, email, role, products } = user;
            return res.json({
                token,
                user: { _id, email, name, role, products }
            });
        });
    }
};

//signout
export const signout = (req, res, next) => {
    res.clearCookie("tokenAccess");
    res.json({
        error: "Đăng xuất thành công",
    });
};

//kiểm tra đăng nhập
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})


//kiểm tả xem có phải là người dùng của trang web
export const isAuth = (req, res, next) => {
    //start kiểm tra _id ở payload token có trùng với _id trong req.profile
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Không truy cập !"
        })
    }
    next();
};

// kiểm tra xem có phải admin quyền It (role == 0)
export const isAdmin = (req, res, next) => {
    if(req.auth.role != 0 ) {
        return res.status(400).json({
            error : "Bạn không phải admin. Vui lòng trở lại trang chủ "
        });
    }
    next();
}
//kiểm tra xem có phải là Staff (role == 2)
export const isStaff = (req, res, next) => {
    if(req.auth.role == 2 ) {
        return res.status(200).json({
            message : 'Bạn là nhân viên'
        })
    }
    next();
}
//kiểm tra manager
export const isManager = (req, res, next) => {
    if(req.auth.role == 3) {
        return res.status(200).json({
            message : "Bạn là giám đốc"
        })
    }
}

//kiểm tra có phải là admin trong router products
export const checkAdmin = (req, res, next) => {
    if (req.auth.role != 0 ) {
        return res.status(403).json({
            err : "Bạn không phải admin. Vui lòng trở lại trang chủ "
        })
    }
    next();
}
import nodemailer from "nodemailer";
export const sendMailer = (req, res, next) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "465",
        secure: true,
        auth: {
            user: "dinhtuyen130601@gmail.com",
            password: "truongtuyen2001"
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    var mainOptions = {
        form: "Test",
        to: req.body.mail,
        subject: `Xin chào ${req.body.mail} ! Bạn đã đặt hàng thành công`,
        text: "",
        html: `Cảm ơn bạn đã mua hàng tại Web của chúng tôi !
          <h3>Danh sách sản phẩm bạn đã đặt</h3>
          <ul>
             <li>${req.body.product}</li>
          </ul>
        `,
    };
    transporter.sendMail(mainOptions, function (err, info) {
        if(err) {
            res.status(400).json({
                error : "Gửi mail không thành công"
            });

        } else {
            res.status(200).json({
                message :"Gửi thành công"
            });
        };
    });
};
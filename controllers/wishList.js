import Wishlist from '../models/wishList';

// lấy id chung
export const wishById = (req, res, next, id) => {
    Wishlist.findById(id).exec((err, wishlist) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: "Không thấy danh sách ưa thích !!"
            })
        }
        req.wishlist = wishlist;
        next();
    })
}

export const addWish = (req, res) => {
    const { idUser, idBook } = req.body;
    if (!idUser || !idBook) {
        return res.status(400).json({
            status: false,
            error: "Không được để trống"
        })
    } else {
        const wish = new Wishlist(req.body)
        wish.save((err, wish) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: "Không thể thêm sản phẩm yêu thích"
                })
            }
            return res.json(wish);
        })
    }

}

export const listWish = (req, res) => {
    Wishlist.find((err, data) => {
        if (err, !data) {
            return res.status(400).json({
                stataus: false,
                error: "Không thể hiển thị danh sách yêu thích !!"
            })
        }
        return res.status(200).json(data)
    })
}

//update
export const updateWishLike = (req, res) => {
    let wish = req.wish;
    wish = _.assignIn(wish, req.body);
    wish.save((err, wish) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: "Không thể update được"
            })
        }
        return res.json(wish);
    })
}

// delete 
export const removeWishList = (req, res) => {
    let wish = req.wish;
    wish.remove((err, wish) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: "Không thể xoá sản phẩm ưa thích"
            })
        }
        return res.json(wish);
    })
}
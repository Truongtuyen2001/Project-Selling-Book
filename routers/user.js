import express from 'express';
import { requireSignin, isAdmin, isAuth, checkAdmin } from '../controllers/auth';
import { showListUser, userById, detailUser, editUser, removeUser } from '../controllers/user';
const UsersRouter = express.Router();

UsersRouter.get('/secret/:UserId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
})

UsersRouter.get('/users', showListUser);
UsersRouter.get('/users/:UserId', requireSignin, isAuth, detailUser);
UsersRouter.put('/users/:UserId', requireSignin, editUser);
UsersRouter.param('UserId', userById);
UsersRouter.delete('/users/:UserId', requireSignin, isAdmin, removeUser);
module.exports = UsersRouter;
import express from 'express';
import { requireSignin, isAdmin, isManager, isAuth, checkAdmin, isStaff } from '../controllers/auth';
import { showListUser, userById, detailUser, editUser, removeUser } from '../controllers/user';
const UsersRouter = express.Router();

UsersRouter.get('/secret/:UserId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
})

UsersRouter.get('/users/list', showListUser);
UsersRouter.get('/users/:UserId', requireSignin, detailUser);
UsersRouter.patch('/users/:UserId', requireSignin, editUser);
UsersRouter.param('UserId', userById);
UsersRouter.delete('/users/:UserId', requireSignin, isAdmin, removeUser);

module.exports = UsersRouter;
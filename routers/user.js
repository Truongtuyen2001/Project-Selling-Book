import express from 'express';
import { requireSignin, isAdmin, isManager, isAuth, checkAdmin } from '../controllers/auth';
import { showListUser, userById, detailUser, editUser, removeUser } from '../controllers/user';
const UsersRouter = express.Router();

UsersRouter.get('/secret/:UserId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
})

UsersRouter.get('/users', requireSignin, isAdmin, isManager, showListUser);
UsersRouter.get('/users/:UserId', requireSignin, isManager, detailUser);
UsersRouter.patch('/users/:UserId', requireSignin, isManager, editUser);
UsersRouter.param('UserId', userById);
UsersRouter.delete('/users/:UserId', requireSignin, isAdmin, isManager, removeUser);

module.exports = UsersRouter;
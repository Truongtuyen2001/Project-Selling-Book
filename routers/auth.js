import express from 'express';
import { register, signin, signout, Validate, userValidationResult, checkMail } from '../controllers/auth'
const router = express.Router();

router.post('/register', Validate, userValidationResult, checkMail, register);
router.get('/signin', signin);
router.get('/signout', signout)

module.exports = router;
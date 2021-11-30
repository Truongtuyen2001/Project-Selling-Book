const mailRouters = express();
import { sendMailer } from '../controllers/mail';
import express from 'express';
mailRouters.post('/sendMail', sendMailer);

export default mailRouters;

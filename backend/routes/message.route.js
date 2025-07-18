import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { uplaod } from '../middleware/multer.js';
import { getMessage, sendMessage } from '../controllers/message.controllers.js';

const messageRouter = express.Router();

messageRouter.post('/send/:receiver', isAuth, uplaod.single("image"), sendMessage);
messageRouter.get('/get/:receiver', isAuth, getMessage); // ✅ fixed route

export default messageRouter;

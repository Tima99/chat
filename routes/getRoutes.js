import express from "express";
import { logoutController , emailVerifyController , sendVerifyLink } from "../controllers"
import {authentication} from "../middlewares"


const router = express.Router();

router.get('/logout' , authentication , logoutController.logout)
router.get('/email/verify/:email_verify_token' , emailVerifyController.emailVerify);
router.get('/verify/link' , authentication , sendVerifyLink.verifyLink)


export default router;

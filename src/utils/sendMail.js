import nodemailer from "nodemailer";

import { SMTP } from "../constacts/index.js";
import {env} from "../utils/env.js";
// import { number } from "joi";

const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth:{
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD)
    }
});

export const sendEmail = async(options)=>{
    return await transporter.sendMail(options);
};
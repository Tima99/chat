import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";
import { MAIL_API_KEY, MAIL_DOMAIN } from "../../config";
import otpTemplate from "./emailOTPtemplate";

const auth = {
  auth: {
    api_key: MAIL_API_KEY,
    domain: MAIL_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport( mailgun(auth));

const mailSchema = {
    from    : 'ninja208201@gmail.com',
    to      : 'amit208201@gmail.com',
    subject : 'You have got REST-APIs-Test',
    html    : '<a></a>',
    text    : 'This is email verification from mailgun sent to you using node.js',
}

const sendEmail = ( verify_text = null , emailSchema = mailSchema) => {
    if(verify_text)
    mailSchema.html = otpTemplate(verify_text)

    nodemailerMailgun.sendMail( emailSchema , ( err , data) => {
        if( err ) return console.log(err);
        console.log(data)
    })
};

export default sendEmail;

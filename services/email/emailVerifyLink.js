import generateJWT from '../generateJWT'
import { WEB_DOMAIN } from "../../config"

const emailVerifyLink = (payloads)=>{
    const email_verify_token = generateJWT(payloads , '24h');

    const email_verify_link = `${WEB_DOMAIN}/api/email/verify/${email_verify_token}`

    return email_verify_link;
}

export default emailVerifyLink;
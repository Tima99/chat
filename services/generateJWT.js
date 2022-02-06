import jwt from 'jsonwebtoken'
import { SECRET_KEY, VERIFY_EMAIL_SECRET_KEY } from '../config'


const generateJWT = (payloads, expiry = '60s') => {
    const acess_token = jwt.sign( payloads , payloads.email_verify && VERIFY_EMAIL_SECRET_KEY || SECRET_KEY , {expiresIn : expiry})
    return acess_token;
}

export default generateJWT;
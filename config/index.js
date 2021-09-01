import dotenv from "dotenv"
dotenv.config()

export const {
    PORT,
    WEB_DOMAIN,
    DEBUG_MODE,
    DB_URL,
    SECRET_KEY,
    MAIL_API_KEY,
    MAIL_DOMAIN,
} = process.env;
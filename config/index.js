import dotenv from "dotenv"
dotenv.config()

export const {
    PORT,
    WEB_DOMAIN,
    DEBUG_MODE,
    IS_USERNAME_REQUIRE,
    IS_USERNAME_UNIQUE,
    DB_URL,
    SECRET_KEY,
    VERIFY_EMAIL_SECRET_KEY,
    MAIL_API_KEY,
    MAIL_DOMAIN,
} = process.env;
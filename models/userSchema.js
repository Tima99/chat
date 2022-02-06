import mongoose from "mongoose";
import { IS_USERNAME_REQUIRE, IS_USERNAME_UNIQUE } from "../config";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
                    type: String,
                    ...(IS_USERNAME_REQUIRE == "true" && { required: true }),
                    ...(IS_USERNAME_UNIQUE == "true" && { unique: true }),
                  },
        email       : { type: String, required: true, unique: true },
        password    : { type: String, required: true },
        email_verify: { type: Boolean, default: false },
        tokens: [
            {
                _id: false,
                token: { type: String, unique: true },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema, "users");

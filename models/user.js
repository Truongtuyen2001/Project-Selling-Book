import mongoose from 'mongoose';
import crypto from "crypto";
import { v1 as uuidv1 } from "uuid";
const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxLength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32,
        },
        // image: {
        //     type: String,
        // },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        salt: {
            type: String
        },
        phone: {
            type: Number,
        },
        // birth: {
        //     type: String,
        //     required: true
        // },
        role: {
            type: String,
            default: 1
        },
        history: {
            type: Array,
            default: []
        },
        products: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

User.virtual("password").set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encrytPassword(password);
})
    .get(function () {
        return this._password;
    });

User.methods = {
    authenticate: function (plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function (password) {
        if (!password) return "";
        try {
            const hashedPassword = crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
            return hashedPassword;
        } catch (error) {
            return ""
        }
    },
};

module.exports = mongoose.model('User', User)

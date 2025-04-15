"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("./envs");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: envs_1.EMAIL_USER,
        pass: envs_1.EMAIL_PASS,
    },
});
exports.default = transporter;

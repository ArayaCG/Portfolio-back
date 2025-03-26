import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "./envs";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export default transporter;

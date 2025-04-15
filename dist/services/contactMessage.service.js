"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactMessageService = exports.getContactMessagesService = void 0;
const envs_1 = require("../config/envs");
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
const contactMessage_repository_1 = __importDefault(require("../repositories/contactMessage.repository"));
const getContactMessagesService = async () => {
    try {
        const contactMessages = await contactMessage_repository_1.default.find();
        return contactMessages;
    }
    catch (error) {
        console.error("Error getting contact messages:", error);
        throw new Error("Unable to retrieve contact messages.");
    }
};
exports.getContactMessagesService = getContactMessagesService;
const createContactMessageService = async (messageData, userIp) => {
    try {
        const messageCountKey = `contact_messages:${userIp}`;
        const currentCount = await redisClient_1.default.incr(messageCountKey);
        if (currentCount === 1) {
            await redisClient_1.default.expire(messageCountKey, 3600);
        }
        if (currentCount > 3) {
            throw new Error("Limit exceeded: Too many messages from this IP");
        }
        const contactMessage = contactMessage_repository_1.default.create(messageData);
        const result = await contactMessage_repository_1.default.save(contactMessage);
        await nodemailer_1.default.sendMail({
            from: envs_1.EMAIL_USER,
            to: envs_1.EMAIL_USER,
            subject: "Nuevo mensaje de contacto recibido",
            text: `Has recibido un nuevo mensaje de contacto:\n\nNombre: ${messageData.name}\nEmail: ${messageData.email}\nMensaje: ${messageData.message}`,
        });
        return result;
    }
    catch (error) {
        console.error("Error creating contact message:", error);
        throw new Error("Unable to create contact message.");
    }
};
exports.createContactMessageService = createContactMessageService;

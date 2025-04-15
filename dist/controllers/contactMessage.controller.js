"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.getMessages = void 0;
const contactMessage_service_1 = require("../services/contactMessage.service");
const getMessages = async (req, res) => {
    try {
        const messages = await (0, contactMessage_service_1.getContactMessagesService)();
        res.status(200).json(messages);
    }
    catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ message: "Error retrieving messages", error });
    }
};
exports.getMessages = getMessages;
const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "0.0.0.0";
        const newMessage = await (0, contactMessage_service_1.createContactMessageService)({ name, email, message }, userIp);
        if (newMessage === null) {
            res.status(429).json({
                message: "Has alcanzado el límite de mensajes. Intenta de nuevo más tarde.",
            });
            return;
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Error creating message", error });
    }
};
exports.createMessage = createMessage;

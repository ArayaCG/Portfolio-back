"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const ContactMessage_1 = require("../entities/ContactMessage");
const ContactMessageRepository = data_source_1.AppDataSource.getRepository(ContactMessage_1.ContactMessage);
exports.default = ContactMessageRepository;

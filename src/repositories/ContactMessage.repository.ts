import { AppDataSource } from "../config/data-source";
import { ContactMessage } from "../entities/ContactMessage";

export const ContactMessageRepository = AppDataSource.getRepository(ContactMessage);

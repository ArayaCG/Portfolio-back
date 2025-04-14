import { AppDataSource } from "../config/data-source";
import { ContactMessage } from "../entities/ContactMessage";

const ContactMessageRepository = AppDataSource.getRepository(ContactMessage);

export default ContactMessageRepository;

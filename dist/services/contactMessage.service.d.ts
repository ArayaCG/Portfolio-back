import { ContactMessageDto } from "../dto/contactMessage.dto";
import { ContactMessage } from "../entities/ContactMessage";
export declare const getContactMessagesService: () => Promise<ContactMessage[]>;
export declare const createContactMessageService: (messageData: ContactMessageDto, userIp: string) => Promise<ContactMessage | null>;

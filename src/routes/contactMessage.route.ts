import { Router } from "express";
import { createMessage, getMessages } from "../controllers/contactMessage.controller";

const contactMessageRoute: Router = Router();

contactMessageRoute.get("/", getMessages);
contactMessageRoute.post("/", createMessage);

export default contactMessageRoute;

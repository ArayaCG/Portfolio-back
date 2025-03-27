import { Router } from "express";
import contactMessageRoute from "./contactMessage.route";
import visitorRoute from "./visitor.route";
import authRouter from "./auth.route";
import swaggerRouter from "../config/swagger.config";
import experienceRoute from "./experience.route";
import aboutMeRoute from "./aboutMe.route";

const router: Router = Router();

router.use(swaggerRouter);
router.use("/aboutMe", aboutMeRoute);
router.use("/auth", authRouter);
router.use("/contactMessage", contactMessageRoute);
router.use("/experiences", experienceRoute);
router.use("/api/visits", visitorRoute);

export default router;

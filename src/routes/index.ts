import { Router } from "express";
import contactMessageRoute from "./contactMessage.route";
import visitorRoute from "./visitor.route";
import authRouter from "./auth.route";
import swaggerRouter from "../config/swagger.config";
import experienceRoute from "./experience.route";
import aboutMeRoute from "./aboutMe.route";
import educationRoute from "./education.route";
import skillRoute from "./skill.route";

const router: Router = Router();

router.use(swaggerRouter);
router.use("/auth", authRouter);
router.use("/aboutMe", aboutMeRoute);
router.use("/contactMessage", contactMessageRoute);
router.use("/experiences", experienceRoute);
router.use("/api/visits", visitorRoute);
router.use("/educations", educationRoute);
router.use("/skills", skillRoute);

export default router;

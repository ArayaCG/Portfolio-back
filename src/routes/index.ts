import { Router } from "express";
import contactMessageRoute from "./contactMessage.route";
import visitorRoute from "./visitor.route";
import authRouter from "./auth.route";
import swaggerRouter from "../config/swagger.config";
import experienceRoute from "./experience.route";

const router: Router = Router();

router.use("/experiences", experienceRoute);
router.use("/contactMessage", contactMessageRoute);
router.use("/api/visits", visitorRoute);
router.use("/auth", authRouter);
router.use(swaggerRouter);

export default router;

import { Router } from "express";
import projectRoute from "./project.route";
import contactMessageRoute from "./contactMessage.route";
import visitorRoute from "./visitor.route";
import authRouter from "./auth.route";
import swaggerRouter from "../config/swagger.config";

const router: Router = Router();

router.use("/projects", projectRoute);
router.use("/contactMessage", contactMessageRoute);
router.use("/api/visits", visitorRoute);
router.use("/auth", authRouter);
router.use(swaggerRouter);

export default router;

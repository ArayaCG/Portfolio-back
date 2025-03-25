import { Router } from "express";
import projectRoute from "./project.route";
import contactMessageRoute from "./contactMessage.route";
import visitorRoute from "./visitor.route";
import authRouter from "./auth.route";

const router: Router = Router();

router.use("/projects", projectRoute);
router.use("/contactMessage", contactMessageRoute);
router.use("/api/visits", visitorRoute);
router.use("/auth", authRouter);

export default router;

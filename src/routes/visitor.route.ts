import { Router } from "express";
import { getVisitCounter, logVisit, getVisitLogs } from "../controllers/visitor.controller";

const visitorRoute = Router();

visitorRoute.get("/count", getVisitCounter);
visitorRoute.post("/log", logVisit);
visitorRoute.get("/logs", getVisitLogs);

export default visitorRoute;

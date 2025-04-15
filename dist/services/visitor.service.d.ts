import redis from "../config/redisClient";
export declare class VisitorService {
    private redis;
    constructor(redisClient: typeof redis);
    logVisit(ip: string | string[] | undefined): Promise<{
        message: string;
        visits: number;
    }>;
    getVisitLogs(): Promise<any[]>;
    getVisitCounter(): Promise<{
        visits: number;
    }>;
}
export declare const visitorService: VisitorService;

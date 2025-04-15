import { Request, Response } from "express";
export declare const getExperiences: (req: Request, res: Response) => Promise<void>;
export declare const getExperienceById: (req: Request, res: Response) => Promise<void>;
export declare const createExperience: (req: Request, res: Response) => Promise<void>;
export declare const updateExperience: (req: Request, res: Response) => Promise<void>;
export declare const deleteExperience: (req: Request, res: Response) => Promise<void>;

import { Request, Response } from "express";
export declare const getAllEducations: (req: Request, res: Response) => Promise<void>;
export declare const getEducationById: (req: Request, res: Response) => Promise<void>;
export declare const createEducation: (req: Request, res: Response) => Promise<void>;
export declare const updateEducation: (req: Request, res: Response) => Promise<void>;
export declare const deleteEducation: (req: Request, res: Response) => Promise<void>;

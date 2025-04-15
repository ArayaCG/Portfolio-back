import { Request, Response } from "express";
export declare const getSkills: (req: Request, res: Response) => Promise<void>;
export declare const getSkillById: (req: Request, res: Response) => Promise<void>;
export declare const createSkill: (req: Request, res: Response) => Promise<void>;
export declare const updateSkill: (req: Request, res: Response) => Promise<void>;
export declare const deleteSkill: (req: Request, res: Response) => Promise<void>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Skill_1 = require("../entities/Skill");
const SkillRepository = data_source_1.AppDataSource.getRepository(Skill_1.Skill);
exports.default = SkillRepository;

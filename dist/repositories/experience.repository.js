"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Experience_1 = require("../entities/Experience");
const ExperienceRepository = data_source_1.AppDataSource.getRepository(Experience_1.Experience);
exports.default = ExperienceRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Education_1 = require("../entities/Education");
const EducationRepository = data_source_1.AppDataSource.getRepository(Education_1.Education);
exports.default = EducationRepository;

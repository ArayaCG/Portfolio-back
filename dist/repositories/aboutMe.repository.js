"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const AboutMe_1 = require("../entities/AboutMe");
const AboutMeRepository = data_source_1.AppDataSource.getRepository(AboutMe_1.AboutMe);
exports.default = AboutMeRepository;

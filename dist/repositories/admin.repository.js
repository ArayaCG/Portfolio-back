"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Admin_1 = require("../entities/Admin");
const AdminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
exports.default = AdminRepository;

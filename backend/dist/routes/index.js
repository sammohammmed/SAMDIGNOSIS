"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth.routes"));
const patient_routes_1 = __importDefault(require("./modules/patient.routes"));
const exam_routes_1 = __importDefault(require("./modules/exam.routes"));
const ai_routes_1 = __importDefault(require("./modules/ai.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/patients', patient_routes_1.default);
router.use('/exams', exam_routes_1.default);
router.use('/ai', ai_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
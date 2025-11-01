"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exam_controller_1 = require("@controllers/exam.controller");
const router = (0, express_1.Router)();
router.get('/', exam_controller_1.listExams);
router.post('/', exam_controller_1.createExam);
router.get('/:id', exam_controller_1.getExam);
router.post('/:id/analyze', exam_controller_1.analyzeExam);
exports.default = router;
//# sourceMappingURL=exam.routes.js.map
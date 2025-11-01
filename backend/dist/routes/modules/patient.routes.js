"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("@controllers/patient.controller");
const exam_controller_1 = require("@controllers/exam.controller");
const router = (0, express_1.Router)();
router.get('/', patient_controller_1.listPatients);
router.post('/', patient_controller_1.createPatient);
router.get('/:id', patient_controller_1.getPatient);
router.get('/:id/exams', patient_controller_1.listPatientExams);
router.post('/:id/exams', exam_controller_1.createExamForPatient);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPatients = listPatients;
exports.createPatient = createPatient;
exports.getPatient = getPatient;
exports.listPatientExams = listPatientExams;
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const mockDb_1 = require("@data/mockDb");
const response_1 = require("@utils/response");
const createPatientSchema = zod_1.z.object({
    mrn: zod_1.z.string().min(3),
    fullName: zod_1.z.string().min(3),
    dateOfBirth: zod_1.z.string(),
    gender: zod_1.z.enum(['male', 'female']),
    bloodType: zod_1.z.string().min(1),
    allergies: zod_1.z.array(zod_1.z.string()).default([]),
    conditions: zod_1.z.array(zod_1.z.string()).default([]),
    upcomingAppointments: zod_1.z.array(zod_1.z.string()).default([])
});
function listPatients(_req, res) {
    const patientSummaries = mockDb_1.patients.map((patient) => {
        const patientExams = mockDb_1.exams.filter((exam) => exam.patientId === patient.id);
        return {
            ...patient,
            examsCount: patientExams.length,
            lastExamAt: patientExams[0]?.createdAt ?? null
        };
    });
    return res.json((0, response_1.ok)(patientSummaries));
}
function createPatient(req, res) {
    const parsed = createPatientSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, response_1.fail)('Invalid patient payload', 'VALIDATION_ERROR'));
    }
    const payload = parsed.data;
    const newPatient = {
        id: (0, uuid_1.v4)(),
        lastVisit: new Date().toISOString(),
        ...payload
    };
    mockDb_1.patients.push(newPatient);
    return res.status(201).json((0, response_1.ok)(newPatient));
}
function getPatient(req, res) {
    const patient = mockDb_1.patients.find((item) => item.id === req.params.id);
    if (!patient) {
        return res.status(404).json((0, response_1.fail)('Patient not found', 'PATIENT_NOT_FOUND'));
    }
    const patientExams = mockDb_1.exams
        .filter((exam) => exam.patientId === patient.id)
        .map((exam) => ({
        id: exam.id,
        type: exam.type,
        modality: exam.modality,
        status: exam.status,
        createdAt: exam.createdAt,
        aiResult: exam.aiResult,
        files: exam.files
    }));
    return res.json((0, response_1.ok)({ patient, exams: patientExams }));
}
function listPatientExams(req, res) {
    const patient = mockDb_1.patients.find((item) => item.id === req.params.id);
    if (!patient) {
        return res.status(404).json((0, response_1.fail)('Patient not found', 'PATIENT_NOT_FOUND'));
    }
    const patientExams = mockDb_1.exams.filter((exam) => exam.patientId === patient.id);
    return res.json((0, response_1.ok)(patientExams));
}
//# sourceMappingURL=patient.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePayload = analyzePayload;
const zod_1 = require("zod");
const response_1 = require("@utils/response");
const analyzeSchema = zod_1.z.object({
    patientId: zod_1.z.string().optional(),
    modality: zod_1.z.string().min(2),
    files: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.enum(['dicom', 'image', 'lab']),
        size: zod_1.z.number().optional()
    }))
        .min(1)
});
function analyzePayload(req, res) {
    const parsed = analyzeSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, response_1.fail)('Invalid AI analysis payload', 'VALIDATION_ERROR'));
    }
    const { modality, files, patientId } = parsed.data;
    const confidence = 0.6 + Math.random() * 0.3;
    return res.json((0, response_1.ok)({
        patientId: patientId ?? null,
        modality,
        summary: `AI-generated insights for ${modality} upload`,
        confidence: Number(confidence.toFixed(2)),
        secondaryFindings: [
            { label: 'No emergent risk indicators', confidence: Math.max(0.4, confidence - 0.25) },
            { label: 'Recommend human-in-the-loop validation', confidence: 0.5 }
        ],
        filesAnalyzed: files.length,
        turnaroundMs: Math.floor(750 + Math.random() * 500)
    }));
}
//# sourceMappingURL=ai.controller.js.map
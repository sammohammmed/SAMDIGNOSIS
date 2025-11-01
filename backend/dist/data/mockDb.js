"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exams = exports.patients = exports.users = void 0;
exports.createExam = createExam;
const uuid_1 = require("uuid");
exports.users = [
    {
        id: 'user-001',
        email: 'sara.almutairi@samdiagnosis.ai',
        password: 'Password123!',
        displayName: 'Dr. Sara Al-Mutairi',
        role: 'radiologist',
        organization: 'SAMDIAGNOSIS Medical Center'
    }
];
exports.patients = [
    {
        id: 'pt-001',
        mrn: 'MRN-824583',
        fullName: 'Ali Hassan',
        dateOfBirth: '1984-03-22',
        gender: 'male',
        bloodType: 'O+',
        allergies: ['Penicillin'],
        conditions: ['Type 2 Diabetes', 'Hypertension'],
        lastVisit: '2025-10-18',
        upcomingAppointments: ['2025-11-05: Endocrinology follow-up']
    },
    {
        id: 'pt-002',
        mrn: 'MRN-291047',
        fullName: 'Fatima Al-Salem',
        dateOfBirth: '1992-11-04',
        gender: 'female',
        bloodType: 'A-',
        allergies: ['Latex'],
        conditions: ['Asthma'],
        lastVisit: '2025-09-27',
        upcomingAppointments: ['2025-11-20: Pulmonology assessment']
    }
];
exports.exams = [
    {
        id: 'exam-1001',
        patientId: 'pt-001',
        type: 'Radiology',
        modality: 'Chest CT',
        status: 'in_review',
        orderedBy: 'Dr. Lina Abdulrahman',
        createdAt: '2025-10-17T09:35:00Z',
        lastReviewedBy: 'Dr. Sara Al-Mutairi',
        files: [
            {
                id: 'file-2001',
                name: 'chest_ct_series.dcm',
                type: 'dicom',
                uploadedAt: '2025-10-17T09:37:00Z',
                size: '120 MB'
            }
        ],
        aiResult: {
            primaryDiagnosis: 'Suspicious pulmonary nodule in the right upper lobe',
            secondaryDiagnoses: [
                { label: 'Early-stage pneumonia', confidence: 0.34 },
                { label: 'Benign calcified granuloma', confidence: 0.22 }
            ],
            confidenceScore: 0.86,
            recommendations: [
                'Recommend contrast-enhanced follow-up CT in 3 months',
                'Notify pulmonology team for multidisciplinary review',
                'Discuss with patient smoking history and risk factors'
            ],
            notes: 'Lesion size measured at 8.4mm with irregular borders. No lymphadenopathy detected.'
        }
    },
    {
        id: 'exam-1002',
        patientId: 'pt-001',
        type: 'Lab',
        modality: 'Comprehensive Metabolic Panel',
        status: 'completed',
        orderedBy: 'Dr. Omar Al-Qahtani',
        createdAt: '2025-09-12T08:20:00Z',
        files: [
            {
                id: 'file-2002',
                name: 'cmp_results_oct.csv',
                type: 'lab',
                uploadedAt: '2025-09-12T08:25:00Z',
                size: '320 KB'
            }
        ],
        aiResult: {
            primaryDiagnosis: 'Metabolic panel indicates stable glycemic control',
            secondaryDiagnoses: [{ label: 'Mild renal function decline', confidence: 0.28 }],
            confidenceScore: 0.74,
            recommendations: [
                'Continue Metformin 500mg BID',
                'Repeat renal function tests in 6 weeks',
                'Encourage hydration and monitor BP at home'
            ]
        }
    },
    {
        id: 'exam-2001',
        patientId: 'pt-002',
        type: 'Radiology',
        modality: 'Chest X-Ray',
        status: 'completed',
        orderedBy: 'Dr. Ahmed Bahri',
        createdAt: '2025-09-20T13:45:00Z',
        files: [
            {
                id: 'file-3001',
                name: 'cxr_october.jpg',
                type: 'image',
                uploadedAt: '2025-09-20T13:46:00Z',
                size: '15 MB'
            }
        ],
        aiResult: {
            primaryDiagnosis: 'Mild hyperinflation consistent with asthma',
            secondaryDiagnoses: [{ label: 'No acute infiltrates detected', confidence: 0.78 }],
            confidenceScore: 0.64,
            recommendations: [
                'Continue inhaled corticosteroid therapy',
                'Schedule spirometry test within 2 weeks'
            ]
        }
    }
];
function createExam(partial) {
    const newExam = {
        ...partial,
        id: (0, uuid_1.v4)(),
        createdAt: new Date().toISOString()
    };
    exports.exams.push(newExam);
    return newExam;
}
//# sourceMappingURL=mockDb.js.map
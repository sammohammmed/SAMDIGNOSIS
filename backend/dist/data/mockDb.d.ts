import { type Exam, type Patient, type User } from '../types';
export declare const users: User[];
export declare const patients: Patient[];
export declare const exams: Exam[];
export declare function createExam(partial: Omit<Exam, 'id' | 'createdAt'>): Exam;
//# sourceMappingURL=mockDb.d.ts.map
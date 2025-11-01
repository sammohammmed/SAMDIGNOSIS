"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const response_1 = require("@utils/response");
const mockDb_1 = require("@data/mockDb");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    displayName: zod_1.z.string().min(3),
    role: zod_1.z.enum(['physician', 'radiologist', 'lab-tech', 'admin']).default('physician'),
    organization: zod_1.z.string().min(2)
});
function login(req, res) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, response_1.fail)('Invalid credentials payload', 'VALIDATION_ERROR'));
    }
    const { email, password } = parsed.data;
    const user = mockDb_1.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) {
        return res.status(401).json((0, response_1.fail)('Incorrect email or password', 'AUTH_FAILED'));
    }
    return res.json((0, response_1.ok)({
        token: (0, uuid_1.v4)(),
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            organization: user.organization
        }
    }));
}
function register(req, res) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, response_1.fail)('Invalid registration data', 'VALIDATION_ERROR'));
    }
    const { email, password, displayName, role, organization } = parsed.data;
    const existing = mockDb_1.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return res.status(409).json((0, response_1.fail)('User already exists', 'USER_EXISTS'));
    }
    const newUser = {
        id: (0, uuid_1.v4)(),
        email,
        password,
        displayName,
        role: role,
        organization
    };
    mockDb_1.users.push(newUser);
    return res.status(201).json((0, response_1.ok)({
        token: (0, uuid_1.v4)(),
        user: {
            id: newUser.id,
            email: newUser.email,
            displayName: newUser.displayName,
            role: newUser.role,
            organization: newUser.organization
        }
    }));
}
//# sourceMappingURL=auth.controller.js.map
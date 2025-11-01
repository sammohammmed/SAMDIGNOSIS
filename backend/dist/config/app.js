"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./env");
const routes_1 = __importDefault(require("../routes"));
function createApp() {
    const app = (0, express_1.default)();
    app.disable('x-powered-by');
    app.use((0, cors_1.default)({ origin: env_1.env.ALLOW_ORIGIN.split(',').map((origin) => origin.trim()) }));
    app.use(express_1.default.json({ limit: '20mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', service: 'samdiagnosis-api', timestamp: new Date().toISOString() });
    });
    app.use('/api', routes_1.default);
    app.use((_req, res) => {
        res.status(404).json({ success: false, error: { message: 'Route not found', code: 'NOT_FOUND' } });
    });
    return app;
}
//# sourceMappingURL=app.js.map
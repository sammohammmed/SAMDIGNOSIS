"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("@controllers/ai.controller");
const router = (0, express_1.Router)();
router.post('/analyze', ai_controller_1.analyzePayload);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map
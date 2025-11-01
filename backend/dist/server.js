"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = require("@config/app");
const env_1 = require("@config/env");
const app = (0, app_1.createApp)();
const server = (0, http_1.createServer)(app);
const port = env_1.env.PORT;
server.listen(port, () => {
    console.log(`SAMDIAGNOSIS API running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map
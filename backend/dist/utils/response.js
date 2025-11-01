"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.fail = fail;
function ok(data, meta) {
    if (meta) {
        return { success: true, data, meta };
    }
    return { success: true, data };
}
function fail(message, code) {
    if (code) {
        return { success: false, error: { message, code } };
    }
    return { success: false, error: { message } };
}
//# sourceMappingURL=response.js.map
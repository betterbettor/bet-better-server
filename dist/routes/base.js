"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.send({
        time: Date.now(),
    });
});
/**
 * GET /health-check
 * @tags health-check
 * @summary This is used for check server connection
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * {
 *   "code": 200
 * }
 * @return {object} 500 - failure response - application/json
 * @example response - 500 - failure response example
 * {
 *   "code": 500
 * }
 */
router.get('/health-check', (req, res) => {
    const responseData = { code: 200 };
    res.json(responseData);
});
exports.default = router;

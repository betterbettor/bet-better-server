"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = require("../utils/response");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.send({
        time: Date.now()
    });
});
/**
 * GET /connect
 * @summary This is used for check server connection
 * @typedef ResponseData
 * @tags connect
 * @return {ResponseData} 200 - success response - application/json
 */
router.get('/connect', (req, res) => {
    const response = (0, response_1.parseResponse)('success', null);
    res.send(response);
});
exports.default = router;

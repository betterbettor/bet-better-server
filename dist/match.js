"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const matchController_1 = __importDefault(require("../controllers/matchController"));
const router = express_1.default.Router();
/**
 * GET /matches
 * @summary This is list all the matches
 * @typedef ResponseData
 * @typedef MatchModel
 * @tags match
 * @return {ResponseData<array<MatchModel>>} 200 - success response - application/json
 */
router.get('/matches', matchController_1.default.getMatchList);
router.post('/matches', matchController_1.default.createDummyData);
exports.default = router;

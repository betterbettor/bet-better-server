"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchService_1 = __importDefault(require("../services/matchService"));
const oddsService_1 = __importDefault(require("../services/oddsService"));
const getMatchList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const matches = yield matchService_1.default.getMatchList();
        const matchResponse = yield Promise.all(matches.map(_processMatch));
        const response = _buildMatchResponse(200, matchResponse);
        res.json(response);
    }
    catch (error) {
        if (error === undefined) {
            res.status(400).json(_buildMatchResponse(400));
        }
        else {
            res.status((_a = error.status) !== null && _a !== void 0 ? _a : 500).json(_buildMatchResponse((_b = error.status) !== null && _b !== void 0 ? _b : 500));
        }
    }
});
const _processMatch = (m) => __awaiter(void 0, void 0, void 0, function* () {
    m.lastUpdated = m.lastUpdated.valueOf();
    const match = Object.assign(Object.assign({}, m), { bookMakerId: 0, bookMakerName: '', odds: [] });
    const odds = yield oddsService_1.default.getOddsByMatchId(m.id);
    const newOdds = odds.map((o, i) => {
        if (i === 0) {
            match.bookMakerId = o.bookMakerId;
            match.bookMakerName = o.bookMakerName;
        }
        return { home: o.home, away: o.away, draw: o.draw, timestamp: o.timestamp.valueOf() };
    });
    match.odds = newOdds;
    return match;
});
const _buildMatchResponse = (statusCode, matchResponse = []) => {
    return {
        code: statusCode,
        matches: matchResponse,
    };
};
exports.default = { getMatchList };

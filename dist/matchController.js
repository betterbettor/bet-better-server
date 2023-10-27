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
const matchModel_1 = __importDefault(require("../models/matchModel"));
const oddsModel_1 = __importDefault(require("../models/oddsModel"));
const teamModel_1 = __importDefault(require("../models/teamModel"));
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
    const match = Object.assign(Object.assign({}, m), { bookMakerId: 0, bookMakerName: '', odds: [] });
    const odds = yield oddsService_1.default.getOddsByMatchId(m.id);
    odds.forEach((o, i) => {
        if (i === 0) {
            match.bookMakerId = o.bookMakerId;
            match.bookMakerName = o.bookMakerName;
        }
        const { home, away, draw, timestamp } = o;
        match.odds.push({ home, away, draw, timestamp });
    });
    return match;
});
const _buildMatchResponse = (statusCode, matchResponse = []) => {
    return {
        code: statusCode,
        matches: matchResponse,
    };
};
const createDummyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.token !== 'betterbettor') {
        res.send({ code: 400, msg: 'rejected' });
    }
    const team = {
        id: 33,
        name: 'Manchester United',
        code: 'MUN',
        logo: 'https://media.api-sports.io/football/teams/33.png',
    };
    const odds = {
        matchId: 326090,
        bookMakerId: 6,
        bookMakerName: 'Bwin',
        home: Math.random() * (2.0 - 3.0) + 2.0,
        away: Math.random() * (2.0 - 3.0) + 2.0,
        draw: Math.random() * (2.0 - 3.0) + 2.0,
        timestamp: Date.now(),
    };
    const league = {
        id: 116,
        name: 'Vysshaya Liga',
        logo: 'https://media.api-sports.io/football/leagues/116.png',
        flag: 'https://media.api-sports.io/flags/by.svg',
    };
    const match = {
        id: 326090,
        startTime: Date.now(),
        league,
        home: team,
        away: team,
        ttl: Date.now(),
        lastUpdated: Date.now(),
    };
    yield matchModel_1.default.create(match);
    if (req.query.createTeam === undefined || req.query.createTeam === 'true') {
        yield teamModel_1.default.create(team);
    }
    if (req.query.createOdds === undefined || req.query.createOdds === 'true') {
        yield oddsModel_1.default.create(odds);
    }
    res.status(200).json({ msg: 'success' });
});
exports.default = { getMatchList, createDummyData };

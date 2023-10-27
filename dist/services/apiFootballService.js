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
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const logger_1 = __importDefault(require("../utils/logger"));
const _callApi = (path, params) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        method: 'GET',
        baseURL: process.env.API_FOOTBALL_ENDPOINT,
        url: path,
        timeout: 3000,
        headers: {
            'X-RapidAPI-Key': (0, config_1.getApiKey)(),
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };
    if (params != null)
        option.params = Object.assign({}, params);
    try {
        const res = yield axios_1.default.request(option);
        return res.data;
    }
    catch (ex) {
        logger_1.default.error(`_callApi: path: ${path} | error: ${ex}`);
        return null;
    }
});
const getLeagueById = (leagueId) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v3/leagues';
    const params = {
        id: leagueId,
        current: 'true',
        bet: config_1.BET_ID,
    };
    const res = yield _callApi(path, params);
    return res;
});
const getTeamInfo = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v3/teams';
    const params = {
        id: teamId,
    };
    const res = yield _callApi(path, params);
    return (res === null || res === void 0 ? void 0 : res.results) === 0 ? null : res;
});
const getFixturesByIds = (fixtureIds) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v3/fixtures';
    const params = {
        ids: fixtureIds.join('-'),
    };
    const res = yield _callApi(path, params);
    return res;
});
const getOddsByLeague = (leagueId, season, page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v3/odds';
    const params = {
        league: leagueId,
        season,
        bet: config_1.BET_ID,
        bookmaker: config_1.BOOK_MAKER_ID,
        page,
    };
    const res = yield _callApi(path, params);
    return res;
});
exports.default = { getFixturesByIds, getLeagueById, getOddsByLeague, getTeamInfo };

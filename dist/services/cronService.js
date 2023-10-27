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
exports.oddsJob = exports.fetchOdds = void 0;
const cron_1 = require("cron");
const apiFootballService_1 = __importDefault(require("./apiFootballService"));
const matchService_1 = __importDefault(require("./matchService"));
const oddsService_1 = __importDefault(require("./oddsService"));
const config_1 = require("../config/config");
const logger_1 = __importDefault(require("../utils/logger"));
const twentyFourHoursInMilliseconds = 24 * 3600 * 1000;
const sevenDaysInMilliseconds = 7 * twentyFourHoursInMilliseconds;
const fetchOdds = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`fetch odds start`);
    const leagueId = config_1.LEAGUE_ID;
    const season = 2023; // TODO::retrieve from DB
    const oddsResponse = yield apiFootballService_1.default.getOddsByLeague(leagueId, season);
    if (oddsResponse === null)
        return;
    const matchResponse = oddsResponse.response;
    logger_1.default.info(`fetch odds in page ${oddsResponse.paging.current}/${oddsResponse.paging.total}`);
    if (oddsResponse.paging.total > 1) {
        const promises = new Array(oddsResponse.paging.total - 1)
            .fill(0)
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            .map((_, i) => apiFootballService_1.default.getOddsByLeague(leagueId, season, i + 2));
        const oddsResponses = yield Promise.all(promises);
        for (const res of oddsResponses) {
            if (res === null)
                continue;
            matchResponse.push(...res.response);
            logger_1.default.info(`fetch odds in page ${res.paging.current}/${res.paging.total}`);
        }
    }
    const odds = _extractOddsFromResponse(matchResponse);
    if (odds.length === 0)
        return;
    const [hasCreatedOdds, newMatchIds] = yield Promise.all([
        oddsService_1.default.createOdds(odds),
        _extractNewMatchIds(matchResponse),
    ]);
    logger_1.default.info(`fetch odds: odds creates = ${hasCreatedOdds} | new Match number = ${newMatchIds.length} | odds pages = ${oddsResponse.paging.total}`);
    if (newMatchIds.length > 0) {
        const newMatches = yield fetchMatches(newMatchIds);
        const hasCreatedMatches = yield matchService_1.default.createMatches(newMatches);
        logger_1.default.info(`fetch matches: matches creates = ${hasCreatedMatches} | number = ${newMatches.length}`);
    }
    yield Promise.all(odds.map(_updateMatchTimestamp));
});
exports.fetchOdds = fetchOdds;
const fetchMatches = (matchIds) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    const maxNumOfMatchesPerRequest = 10;
    for (let i = 0; i < matchIds.length; i += maxNumOfMatchesPerRequest) {
        promises.push(apiFootballService_1.default.getFixturesByIds(matchIds.slice(i, i + maxNumOfMatchesPerRequest)));
    }
    const fixturesResponses = yield Promise.all(promises);
    return fixturesResponses
        .map((fixturesResponse) => {
        let matches = [];
        if (fixturesResponse !== null) {
            matches = _extractMatchesFromResponse(fixturesResponse);
            logger_1.default.info(`fetch matches: pages = ${fixturesResponse.paging.current}/${fixturesResponse.paging.total}`);
        }
        logger_1.default.info(`fetch matches: total = ${matches.length}`);
        return matches;
    })
        .flat();
});
const _updateMatchTimestamp = (odds) => __awaiter(void 0, void 0, void 0, function* () {
    return yield matchService_1.default.updateTimestamp(odds.matchId, odds.timestamp);
});
const _extractNewMatchIds = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchIds = res.map((match) => match.fixture.id);
    const storedMatches = yield matchService_1.default.getMatchList();
    const storedMatchesIds = storedMatches.map(({ id }) => id);
    return matchIds.reduce((newMatchIds, matchId) => {
        if (storedMatchesIds.find((id) => id === matchId) === undefined)
            newMatchIds.push(matchId);
        return newMatchIds;
    }, []);
});
const _extractOddsFromResponse = (res) => {
    return res.reduce((odds, matchResponse) => {
        const { bookmakers, fixture } = matchResponse;
        const startTime = fixture.timestamp * 1000;
        const curOdds = bookmakers.map((bookmaker) => {
            var _a, _b, _c, _d, _e, _f;
            const values = bookmaker.bets[0].values;
            return {
                home: parseFloat((_b = (_a = values.find(({ value }) => value === 'Home')) === null || _a === void 0 ? void 0 : _a.odd) !== null && _b !== void 0 ? _b : ''),
                away: parseFloat((_d = (_c = values.find(({ value }) => value === 'Away')) === null || _c === void 0 ? void 0 : _c.odd) !== null && _d !== void 0 ? _d : ''),
                draw: parseFloat((_f = (_e = values.find(({ value }) => value === 'Draw')) === null || _e === void 0 ? void 0 : _e.odd) !== null && _f !== void 0 ? _f : ''),
                timestamp: new Date(matchResponse.update).getTime(),
                matchId: fixture.id,
                bookMakerId: bookmaker.id,
                bookMakerName: bookmaker.name,
                ttl: startTime + sevenDaysInMilliseconds,
            };
        });
        return odds.concat(curOdds);
    }, []);
};
const _extractMatchesFromResponse = (res) => {
    const now = Date.now();
    return res.response.map(({ fixture, league, teams }) => {
        const startTime = fixture.timestamp * 1000;
        return {
            id: fixture.id,
            startTime,
            league,
            home: teams.home,
            away: teams.away,
            ttl: startTime + sevenDaysInMilliseconds,
            lastUpdated: now,
        };
    });
};
exports.oddsJob = new cron_1.CronJob('0 0 */3 * * *', exports.fetchOdds, null, false);

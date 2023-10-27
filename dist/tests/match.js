"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const base = 'http://localhost:8000';
describe('/matches api tests', () => {
    it('should return a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.default
            .request(base)
            .get('/matches')
            .end((_err, res) => {
            chai_1.assert.equal(res.status, 200);
        });
    }));
    it('check object field type', () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.default
            .request(base)
            .get('/matches')
            .end((_err, res) => {
            // check success response status
            chai_1.assert.equal(res.status, 200);
            chai_1.default.expect(res.body.matches).to.be.a('array');
            if (res.body.matches.length === 0) {
                return;
            }
            const match = res.body.matches[0];
            // match
            chai_1.default.expect(match.id).to.be.a(typeof match.id);
            chai_1.default.expect(match.startTime).to.be.a(typeof match.startTime);
            chai_1.default.expect(match.lastUpdated).to.be.a(typeof match.lastUpdated);
            chai_1.default.expect(match.bookMakerId).to.be.a(typeof match.bookMakerId);
            chai_1.default.expect(match.bookMakerName).to.be.a(typeof match.bookMakerName);
            // league
            const league = match.league;
            chai_1.default.expect(league.id).to.be.a(typeof league.id);
            chai_1.default.expect(league.name).to.be.a(typeof league.name);
            chai_1.default.expect(league.logo).to.be.a(typeof league.logo);
            chai_1.default.expect(league.flag).to.be.a(typeof league.flag);
            // home team
            const home = match.home;
            chai_1.default.expect(home.id).to.be.a(typeof home.id);
            chai_1.default.expect(home.name).to.be.a(typeof home.name);
            chai_1.default.expect(home.logo).to.be.a(typeof home.logo);
            // away team
            const away = match.away;
            chai_1.default.expect(away.id).to.be.a(typeof away.id);
            chai_1.default.expect(away.name).to.be.a(typeof away.name);
            chai_1.default.expect(away.logo).to.be.a(typeof away.logo);
            chai_1.default.expect(match.odds).to.be.a('array');
            if (match.odds.length > 0) {
                const odds = match.odds[0];
                chai_1.default.expect(odds.home).to.be.a(typeof odds.home);
                chai_1.default.expect(odds.away).to.be.a(typeof odds.away);
                chai_1.default.expect(odds.draw).to.be.a(typeof odds.draw);
                chai_1.default.expect(odds.timestamp).to.be.a(typeof odds.timestamp);
            }
        });
    }));
});

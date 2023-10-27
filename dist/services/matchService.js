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
const matchModel_1 = __importDefault(require("../models/matchModel"));
const getMatchList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield matchModel_1.default.find({}, '-_id -__v -ttl -league._id -home._id -away._id').lean();
});
const createMatches = (matches) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield matchModel_1.default.create(matches);
        return true;
    }
    catch (ex) {
        return false;
    }
});
const updateTimestamp = (matchId, lastUpdated) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield matchModel_1.default.updateOne({ id: matchId }, { lastUpdated });
        return true;
    }
    catch (ex) {
        return false;
    }
});
exports.default = { getMatchList, createMatches, updateTimestamp };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueSchema = void 0;
const mongoose_1 = require("mongoose");
// define object
exports.leagueSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    logo: String,
    flag: String,
});

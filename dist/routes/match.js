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
 * @tags match
 * @return {MatchResponseData} 200 - success response - application/json
 * @example response - 200 - success response example
 * {
 *  "code": 200,
 *  "matches": [
 *      {
 *          "_id": "652ded66c66643c480f1e2e6",
 *          "id": 326090,
 *          "startTime": 1589554800,
 *          "league": {
 *              "id": 116,
 *              "name": "Vysshaya Liga",
 *              "logo": "https://media.api-sports.io/football/leagues/116.png",
 *              "flag": "https://media.api-sports.io/flags/by.svg"
 *          },
 *          "home": {
 *              "id": 33,
 *              "name": "Manchester United",
 *              "code": "MUN",
 *              "logo": "https://media.api-sports.io/football/teams/33.png"
 *          },
 *          "away": {
 *              "id": 33,
 *              "name": "Manchester United",
 *              "code": "MUN",
 *              "logo": "https://media.api-sports.io/football/teams/33.png"
 *          },
 *          "ttl": 1589754800,
 *          "lastUpdated": 1589554800,
 *          "__v": 0,
 *          "bookMakerId": 6,
 *          "bookMakerName": "Bwin",
 *          "odds": [
 *              {
 *                  "home": 2.95,
 *                  "away": 2.95,
 *                  "draw": 2.5,
 *                  "timestamp": 1589554800
 *              },
 *              {
 *                  "home": 2.92,
 *                  "away": 2.93,
 *                  "draw": 2.3,
 *                  "timestamp": 1589554801
 *              }
 *          ]
 *      },
 *      {
 *          "_id": "652dedbe4a27afd945550b49",
 *          "id": 326090,
 *          "startTime": 1589554800,
 *          "league": {
 *              "id": 116,
 *              "name": "Vysshaya Liga",
 *              "logo": "https://media.api-sports.io/football/leagues/116.png",
 *              "flag": "https://media.api-sports.io/flags/by.svg"
 *          },
 *          "home": {
 *              "id": 33,
 *              "name": "Manchester United",
 *              "code": "MUN",
 *              "logo": "https://media.api-sports.io/football/teams/33.png"
 *          },
 *          "away": {
 *              "id": 33,
 *              "name": "Manchester United",
 *              "code": "MUN",
 *              "logo": "https://media.api-sports.io/football/teams/33.png"
 *          },
 *          "ttl": 1589754800,
 *          "lastUpdated": 1589554800,
 *          "__v": 0,
 *          "bookMakerId": 6,
 *          "bookMakerName": "Bwin",
 *          "odds": [
 *               {
 *                   "home": 2.95,
 *                   "away": 2.95,
 *                   "draw": 2.5,
 *                   "timestamp": 1589554800
 *               },
 *               {
 *                   "home": 2.92,
 *                   "away": 2.93,
 *                   "draw": 2.3,
 *                   "timestamp": 1589554801
 *               }
 *            ]
 *        }
 *    ]
 *  }
 * @return {MatchResponseData} 400 - failure response - application/json
 * @example response - 400 - failure response example
 * {
 *   "code": 400,
 *   "matches": []
 * }
 */
router.get('/matches', matchController_1.default.getMatchList);
exports.default = router;

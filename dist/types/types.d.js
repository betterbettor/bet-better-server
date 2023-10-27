"use strict";
/**
 * Represents a league team.
 * @typedef {object} League
 * @property {number} id - ID of League
 * @property {string} name - Name of League
 * @property {string} logo - Logo of League
 * @property {string} flag - Flag or League
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a sports team.
 * @typedef {object} Team
 * @property {number} id - The ID of the team.
 * @property {string} name - The name of the team.
 * @property {string} code - The code associated with the team.
 * @property {string} logo - The URL to the team's logo.
 */
/**
 * Represents odds information for a match.
 * @typedef {object} Odds
 * @property {OddsValues} oddsValues - The odds of the match.
 * @property {number} matchId - The ID of the match.
 * @property {number} bookMakerId - The ID of the bookmaker.
 * @property {string} bookMakerName - The name of the bookmaker.
 */
/**
 * Represents odds values for a match.
 * @typedef {object} OddsValues
 * @property {number} home - The odds for the home team.
 * @property {number} away - The odds for the away team.
 * @property {number} draw - The odds for a draw.
 * @property {number} timestamp - The timestamp for the odds (date transformation handled by frontend).
 */
/**
 * Represents a match.
 * @typedef {object} Match
 * @property {number} id - The ID of the match.
 * @property {number} startTime - The start time of the match.
 * @property {League} league - The league to which the match belongs.
 * @property {Team} home - The home team.
 * @property {Team} away - The away team.
 * @property {number} lastUpdated - The timestamp of the last update.
 */
/**
 * Represents response data.
 * @typedef {object} ResponseData
 * @property {number} code - The response code.
 */
/**
 * Represents a match response.
 * @typedef {object} MatchResponse
 * @property {number} id - The ID of the match.
 * @property {number} startTime - The start time of the match.
 * @property {League} league - The league to which the match belongs.
 * @property {Team} home - The home team.
 * @property {Team} away - The away team.
 * @property {number} ttl - Time-to-live (TTL) value.
 * @property {number} lastUpdated - The timestamp of the last update.
 * @property {number} bookMakerId - The ID of the bookmaker (optional).
 * @property {string} bookMakerName - The name of the bookmaker (optional).
 * @property {OddsValues[]} odds - An array of odds values.
 */
/**
 * Represents match response data.
 * @typedef {object} MatchResponseData
 * @property {number} code - The response code.
 * @property {MatchResponse[]} matches - An array of match responses.
 */
exports.default = {};

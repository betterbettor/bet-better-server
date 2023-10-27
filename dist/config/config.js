"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadApiKeys = exports.getApiKey = exports.LEAGUE_ID = exports.BOOK_MAKER_ID = exports.BET_ID = void 0;
exports.BET_ID = 1; // Match Winner
exports.BOOK_MAKER_ID = '8'; // Bet365
exports.LEAGUE_ID = 39; // Premier League
// API key rotation
let getApiKey = () => '';
exports.getApiKey = getApiKey;
const _getApiKeyCache = () => {
    var _a, _b;
    const keys = (_b = (_a = process.env.API_KEY) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
    const numberOfKeys = keys.length;
    let keyIdx = 0;
    return () => {
        const key = keys[keyIdx];
        keyIdx = (keyIdx + 1) % numberOfKeys;
        return key;
    };
};
const loadApiKeys = () => {
    exports.getApiKey = _getApiKeyCache();
};
exports.loadApiKeys = loadApiKeys;

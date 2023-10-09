"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.parseErrorResponse = exports.isInvalidResponse = exports.parseResponse = void 0;
const parseResponse = (msg, data) => {
    return {
        success: true,
        status: 200,
        message: msg,
        data
    };
};
exports.parseResponse = parseResponse;
const isInvalidResponse = (data) => {
    return data === null || data.length === 0;
};
exports.isInvalidResponse = isInvalidResponse;
const parseErrorResponse = (msg) => {
    return {
        success: false,
        status: 400,
        message: msg
    };
};
exports.parseErrorResponse = parseErrorResponse;
const errorHandler = (err, req, res) => {
    var _a;
    const code = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    return {
        success: false,
        status: code,
        message: err.message
    };
};
exports.errorHandler = errorHandler;

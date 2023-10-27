"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvironment = void 0;
const checkEnvironment = (envNames) => {
    for (const envName of envNames) {
        if (!_isValid(envName))
            return false;
    }
    return true;
};
exports.checkEnvironment = checkEnvironment;
const _isValid = (envName) => {
    const env = process.env[envName];
    return env !== undefined && env !== '';
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const options = {
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.splat(), winston_1.format.printf(({ level, timestamp, message }) => {
        return `${level}::"${timestamp}" : ${message}`;
    })),
    defaultMeta: { service: 'Render' },
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.format.splat(), winston_1.format.printf(({ level, timestamp, message }) => {
                return `${level}::"${timestamp}" : ${message}`;
            })),
        }),
        new winston_1.transports.File({ filename: 'server-error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'server.log' }),
    ],
};
const logger = (0, winston_1.createLogger)(options);
exports.default = logger;

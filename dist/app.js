"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
// import { parseErrorResponse } from './utils/response'
const base_1 = __importDefault(require("./routes/base"));
const match_1 = __importDefault(require("./routes/match"));
const express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
const mongoose_1 = __importDefault(require("mongoose"));
const cronService_1 = require("./services/cronService");
const config_1 = require("./config/config");
const logger_1 = __importDefault(require("./utils/logger"));
const validator_1 = require("./utils/validator");
dotenv_1.default.config();
const envNames = ['DB_USERNAME', 'DB_PASSWORD', 'API_FOOTBALL_ENDPOINT', 'API_KEY'];
if (!(0, validator_1.checkEnvironment)(envNames)) {
    logger_1.default.error(`${envNames.join(', ')} are required!`);
    process.exit();
}
// file deepcode ignore UseCsurfForExpress: application do not require any authentication
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:3000', 'https://bet-better-react.netlify.app'];
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
(0, config_1.loadApiKeys)();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0kgbqss.mongodb.net/betterBettor?retryWrites=true&w=majority`;
try {
    void mongoose_1.default.connect(uri);
    mongoose_1.default.connection.once('open', () => {
        logger_1.default.info('Database connected ..');
        cronService_1.oddsJob.start();
    });
}
catch (err) {
    logger_1.default.error(`Database error .. ${err}`);
}
const options = {
    info: {
        version: '1.0.0',
        title: 'BetBetter',
        license: {
            name: 'MIT',
        },
    },
    security: {
    // BasicAuth: {
    //   type: 'http',
    //   scheme: 'basic',
    // },
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};
(0, express_jsdoc_swagger_1.default)(app)(options);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.use(base_1.default);
app.use(match_1.default);
// app.use(parseErrorResponse)
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on http://localhost:${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { parseErrorResponse } from './utils/response'
const base_1 = __importDefault(require("./routes/base"));
const match_1 = __importDefault(require("./routes/match"));
const express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0kgbqss.mongodb.net/?retryWrites=true&w=majority`;
try {
    void mongoose_1.default.connect(uri);
    mongoose_1.default.connection.once('open', () => {
        console.log('Database connected ..');
    });
}
catch (err) {
    console.log('Database error ..', err);
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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(base_1.default);
app.use(match_1.default);
// app.use(parseErrorResponse)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

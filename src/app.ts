import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
// import { parseErrorResponse } from './utils/response'
import baseRouter from './routes/base';
import matchRouter from './routes/match';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import mongoose from 'mongoose';
import { oddsJob } from './services/cronService';
import { loadApiKeys } from './config/config';

// file deepcode ignore UseCsurfForExpress: application do not require any authentication
const app: Application = express();

const allowedOrigins = ['http://localhost:3000', 'https://bet-better-react.netlify.app'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());

dotenv.config();
loadApiKeys();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0kgbqss.mongodb.net/betterBettor?retryWrites=true&w=majority`;

try {
  void mongoose.connect(uri);
  mongoose.connection.once('open', () => {
    console.log('Database connected ..');
    oddsJob.start();
  });
} catch (err) {
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

expressJSDocSwagger(app)(options);

const PORT = process.env.PORT ?? 8000;

app.use(baseRouter);
app.use(matchRouter);

// app.use(parseErrorResponse)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

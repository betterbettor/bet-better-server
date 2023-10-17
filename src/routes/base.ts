import express, { NextFunction, Request, Response } from 'express';
import { ResponseData } from '../interfaces/response.interface';
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    time: Date.now(),
  });
});

/**
 * GET /health-check
 * @summary This is used for check server connection
 * @typedef ResponseData
 * @tags health-check
 * @return {ResponseData} 200 - success response - application/json
 */
router.get('/health-check', (req: Request, res: Response) => {
  const responseData: ResponseData = { code: 200 };
  res.json(responseData);
});

export default router;

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
 * @tags health-check
 * @summary This is used for check server connection
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * {
 *   "code": 200
 * }
 * @return {object} 500 - failure response - application/json
 * @example response - 500 - failure response example
 * {
 *   "code": 500
 * }
 */
router.get('/health-check', (req: Request, res: Response) => {
  const responseData: ResponseData = { code: 200 };
  res.json(responseData);
});

export default router;

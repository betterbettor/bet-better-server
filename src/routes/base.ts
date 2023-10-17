
import express, { NextFunction, Request, Response } from 'express'
import { ResponseData } from '../interfaces/response.interface';
const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    time: Date.now(),
  });
});

/**
 * GET /connect
 * @summary This is used for check server connection
 * @typedef ResponseData
 * @tags connect
 * @return {ResponseData} 200 - success response - application/json
 */
router.get('/healthcheck', (req: Request, res: Response) => {
  if (req.statusCode === undefined) {
    res.json({
      code: 500
    })
  } else {
    res.json({
        code: req.statusCode ?? 200
    })
  }
})

export default router;

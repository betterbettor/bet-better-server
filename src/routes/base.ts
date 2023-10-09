import express, { type NextFunction, type Request, type Response } from 'express'
import { parseResponse } from '../utils/response'
const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    time: Date.now()
  })
})

/**
 * GET /connect
 * @summary This is used for check server connection
 * @typedef ResponseData
 * @tags connect
 * @return {ResponseData} 200 - success response - application/json
 */
router.get('/connect', (req: Request, res: Response) => {
  const response = parseResponse('success', null)
  res.send(response)
})

export default router

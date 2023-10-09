import express, { type Request, type Response } from 'express'
import { type ResponseData, parseResponse } from '../utils/response'
import { MatchModel } from "../models/match";

const router = express.Router()

/**
 * GET /matches
 * @summary This is list all the matches
 * @typedef ResponseData
 * @typedef MatchModel
 * @tags match
 * @return {ResponseData<array<MatchModel>>} 200 - success response - application/json
 */
router.get('/matches', (req: Request, res: Response) => {
  const response: ResponseData<MatchModel[]> = parseResponse('success', [])
  res.send(response)
})

export default router

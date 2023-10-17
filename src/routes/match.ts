import express from 'express';
import MatchListController from '../controllers/matchController';
import { MatchResponse } from '../interfaces/match.interface';
import ResponseData from '../interfaces/response.interface';

const router = express.Router();

/**
 * GET /matches
 * @summary This is list all the matches
 * @typedef ResponseData
 * @typedef MatchModel
 * @tags match
 * @return {ResponseData<array<MatchModel>>} 200 - success response - application/json
 */
router.get('/matches', MatchListController.getMatchList);

export default router;

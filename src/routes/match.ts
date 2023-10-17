import express, { RequestHandler } from 'express';
import MatchListController from '../controllers/matchController';

const router = express.Router();

/**
 * GET /matches
 * @summary This is list all the matches
 * @typedef ResponseData
 * @typedef MatchModel
 * @tags match
 * @return {ResponseData<array<MatchModel>>} 200 - success response - application/json
 */
router.get('/matches', MatchListController.getMatchList as RequestHandler);

export default router;

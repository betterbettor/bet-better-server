import { MatchResponse } from './match.interface';

export interface ResponseData {
  code: number;
}

interface MatchResponseData extends ResponseData {
  matches: MatchResponse[];
}

export default MatchResponseData;

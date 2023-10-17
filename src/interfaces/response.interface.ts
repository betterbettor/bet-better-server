import { MatchResponse } from './match.interface';

interface ResponseData {
  code: number;
  matches: MatchResponse[];
}

export default ResponseData;

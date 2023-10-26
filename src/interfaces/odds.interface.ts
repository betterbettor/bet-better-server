export interface OddsValues {
  home: number;
  away: number;
  draw: number;
  timestamp: number; // date transformation handled by frontend
}

interface Odds extends OddsValues {
  matchId: number;
  bookMakerId: number;
  bookMakerName: string;
  ttl: number;
}

export default Odds;

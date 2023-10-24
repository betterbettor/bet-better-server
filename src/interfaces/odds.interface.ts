export interface OddsValues {
  home: number;
  away: number;
  draw: number;
  timestamp: number; // date transformation handled by frontend
  ttl: number;
}

interface Odds extends OddsValues {
  matchId: number;
  bookMakerId: number;
  bookMakerName: string;
}

export default Odds;

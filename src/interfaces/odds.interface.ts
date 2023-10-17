export interface OddsValues {
  home: number;
  away: number;
  draw: number;
}

interface Odds extends OddsValues {
  matchId: number;
  bookMakerId: number;
  bookMakerName: string;
  timestamp: number;
}

export default Odds;

interface Odds {
  matchId: number;
  bookMakerId: number;
  bookMakerName: string;
  timestamp: number;
  home: number;
  away: number;
  draw: number;
}

export default Odds;

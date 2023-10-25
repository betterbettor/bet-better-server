import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import League from '../interfaces/league.interface';
import { MatchResponse } from '../interfaces/match.interface';
import Team from '../interfaces/team.interface';
import { OddsValues } from '../interfaces/odds.interface';

chai.use(chaiHttp);

const base = 'http://localhost:8000';

describe('/matches api tests', () => {
  it('should return a 200 status', async () => {
    chai
      .request(base)
      .get('/matches')
      .end((_err, res) => {
        assert.equal(res.status, 200);
      });
  });

  it('check object field type', async () => {
    chai
      .request(base)
      .get('/matches')
      .end((_err, res) => {
        assert.equal(res.status, 200);
        if (res.body.matches.length === 0) {
          return;
        }
        const match: MatchResponse = res.body.matches[0];

        // match
        chai.expect(match.id).to.be.a(typeof match.id);
        chai.expect(match.startTime).to.be.a(typeof match.startTime);
        chai.expect(match.lastUpdated).to.be.a(typeof match.lastUpdated);
        chai.expect(match.bookMakerId).to.be.a(typeof match.bookMakerId);
        chai.expect(match.bookMakerName).to.be.a(typeof match.bookMakerName);

        // league
        const league: League = match.league;
        chai.expect(league.id).to.be.a(typeof league.id);
        chai.expect(league.name).to.be.a(typeof league.name);
        chai.expect(league.logo).to.be.a(typeof league.logo);
        chai.expect(league.flag).to.be.a(typeof league.flag);

        // home team
        const home: Team = match.home;
        chai.expect(home.id).to.be.a(typeof home.id);
        chai.expect(home.name).to.be.a(typeof home.name);
        chai.expect(home.logo).to.be.a(typeof home.logo);

        // away team
        const away: Team = match.away;
        chai.expect(away.id).to.be.a(typeof away.id);
        chai.expect(away.name).to.be.a(typeof away.name);
        chai.expect(away.logo).to.be.a(typeof away.logo);

        if (match.odds.length > 0) {
          const odds: OddsValues = match.odds[0];
          chai.expect(odds.home).to.be.a(typeof odds.home);
          chai.expect(odds.away).to.be.a(typeof odds.away);
          chai.expect(odds.draw).to.be.a(typeof odds.draw);
          chai.expect(odds.timestamp).to.be.a(typeof odds.timestamp);
        }
      });
  });
});

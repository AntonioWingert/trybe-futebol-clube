import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test for /leaderboard', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return a home leaderBoard', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should return a away leaderBoard', async () => {
    const response = await chai.request(app).get('/leaderboard/away');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should return all leaderBoard', async () => {
    const response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});
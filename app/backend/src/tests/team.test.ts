import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsMock from './mocks/mockTeam';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test for /teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all teams', async () => {
    sinon.stub(Model, 'findAll').resolves(teamsMock);

    const res = await chai.request(app).get('/teams');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(teamsMock);
    expect(res.body.length).to.equal(3);
  });

  it('should return an empty array if there are no teams', async () => {
    sinon.stub(Model, 'findAll').resolves([]);

    const res = await chai.request(app).get('/teams');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  it('should return a team by id', async () => {
    sinon.stub(Model, 'findOne').resolves(teamsMock[0]);

    const res = await chai.request(app).get('/teams/1');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(teamsMock[0]);
  });

  it('should return a custom message if team is not found', async () => {
    sinon.stub(Model, 'findOne').resolves(undefined);

    const res = await chai.request(app).get('/teams/1');

    expect(res.status).to.equal(404);
    expect(res.body).to.be.deep.equal({ message: 'Team not found' });
  });

  it('should return a custom message if team id is not a number', async () => {
    sinon.stub(Model, 'findOne').resolves(undefined);

    const res = await chai.request(app).get('/teams/:a');

    expect(res.status).to.equal(400);
    expect(res.body).to.be.deep.equal({ message: 'Id must be a number' });
  });
  
});
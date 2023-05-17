import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { matchesListMock, newMatchReq, newMatchReqInvalid, newMatchRes, updateMatchReq } from './mocks/mockMatches';
import MatchModel from '../database/models/MatchModel';
import { userInput, userOutput } from './mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test for /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all matches', async () => {
    sinon.stub(Model, 'findAll').resolves(matchesListMock as unknown as Model<MatchModel>[]);

    const res = await chai.request(app).get('/matches');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(matchesListMock);
  });

  it('should return 201 when creating a new match', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginRes = await chai.request(app).post('/login').send(userInput);
    
    sinon.stub(Model, 'create').resolves(newMatchRes);

    const matchesRes = await chai.request(app).post('/matches').set('Authorization', loginRes.body.token).send(newMatchReq);

    expect(matchesRes.status).to.equal(201);
    expect(matchesRes.body).to.deep.equal(newMatchRes);
  });

  it('should return 404 when creating a new match with invalid Id', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginRes = await chai.request(app).post('/login').send(userInput);
    
    sinon.stub(Model, 'findByPk').resolves(undefined);

    const matchesRes = await chai.request(app).post('/matches').set('Authorization', loginRes.body.token).send(newMatchReqInvalid);

    expect(matchesRes.status).to.equal(404);
    expect(matchesRes.body.message).to.deep.equal('There is no team with such id!');
  });

  it('should return only in progress matches', async () => {
    sinon.stub(Model, 'findAll').resolves([matchesListMock[2]] as unknown as Model<MatchModel>[]);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([matchesListMock[2]]);
  });

  it('should actualize in progress match', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginRes = await chai.request(app).post('/login').send(userInput);
    
    sinon.stub(Model, 'update').resolves([1]);

    const matchesRes = await chai.request(app).patch('/matches/1').set('Authorization', loginRes.body.token).send(updateMatchReq);

    expect(matchesRes.status).to.equal(200);
  });
});
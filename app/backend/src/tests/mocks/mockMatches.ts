import Match from '../../database/models/MatchModel';
import IMatch from '../../types/IMatch';

export const matchesListMock: IMatch[] = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    inProgress: false,
    awayTeamGoals: 0,
    awayTeam: {
      teamName: 'Grêmio'
    },
    homeTeam: {
      teamName: 'Internacional'
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    inProgress: false,
    awayTeamGoals: 1,
    awayTeam: {
      teamName: 'Santos'
    },
    homeTeam: {
      teamName: 'Internacional'
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    inProgress: true,
    awayTeamGoals: 0,
    awayTeam: {
      teamName: 'Napoli-SC'
    },
    homeTeam: {
      teamName: 'Corinthians'
    }
  }
]

export const newMatchRes = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
} as Match;

export const newMatchReq = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const updateMatchReq = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

export const newMatchResInvalid = {
  id: 1,
  homeTeamId: 160,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
} as Match;

export const newMatchReqInvalid = {
  homeTeamId: 160,
  awayTeamId: 800,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}
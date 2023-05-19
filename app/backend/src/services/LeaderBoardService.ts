import Team from '../entities/Team';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../types/IMatch';
import { TeamType } from '../types/TeamType';
import { TeamPerformance } from '../types/TeamPerfomance';
import TeamModel, { TeamAttributes } from '../database/models/TeamModel';

export default class LeaderBoardService {
  private static async getMatches(): Promise<IMatch[]> {
    const matches = await MatchModel.findAll({
      where: {
        inProgress: false,
      },
    });

    return matches.map((match) => match.dataValues);
  }

  private static async getTeams(): Promise<TeamAttributes[]> {
    const teams = await TeamModel.findAll();

    return teams.map((team) => team.dataValues);
  }

  private static setWinLossDraw(firstTeam: number, secondTeam: number) {
    const performance = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    if (firstTeam > secondTeam) {
      performance.totalPoints += 3;
      performance.totalVictories += 1;
    } else if (firstTeam === secondTeam) {
      performance.totalPoints += 1;
      performance.totalDraws += 1;
    } else {
      performance.totalLosses += 1;
    }

    return performance;
  }

  private static getHomeTeamInformation(team: TeamType, matches: IMatch[]) {
    const homeTeamInfo = new Team(team.teamName);
    matches.filter((match) => team.id === match.homeTeamId)
      .forEach((playedMatch) => {
        const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
          .setWinLossDraw(playedMatch.homeTeamGoals, playedMatch.awayTeamGoals);

        homeTeamInfo.totalPoints += totalPoints;
        homeTeamInfo.totalVictories += totalVictories;
        homeTeamInfo.totalDraws += totalDraws;
        homeTeamInfo.totalLosses += totalLosses;
        homeTeamInfo.goalsFavor += playedMatch.homeTeamGoals;
        homeTeamInfo.goalsOwn += playedMatch.awayTeamGoals;
        homeTeamInfo.totalGames += 1;
        homeTeamInfo.goalsBalance = homeTeamInfo.goalsFavor - homeTeamInfo.goalsOwn;
        homeTeamInfo.efficiency = Number((
          (homeTeamInfo.totalPoints / (homeTeamInfo.totalGames * 3)) * 100
        ).toFixed(2));
      });

    return homeTeamInfo;
  }

  private static getAwayTeamInformation(team: TeamType, matches: IMatch[]) {
    const awayTeamInfo = new Team(team.teamName);
    matches.filter((match) => team.id === match.awayTeamId)
      .forEach((playedMatch) => {
        const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
          .setWinLossDraw(playedMatch.awayTeamGoals, playedMatch.homeTeamGoals);

        awayTeamInfo.totalPoints += totalPoints;
        awayTeamInfo.totalVictories += totalVictories;
        awayTeamInfo.totalDraws += totalDraws;
        awayTeamInfo.totalLosses += totalLosses;
        awayTeamInfo.goalsFavor += playedMatch.awayTeamGoals;
        awayTeamInfo.goalsOwn += playedMatch.homeTeamGoals;
        awayTeamInfo.totalGames += 1;
        awayTeamInfo.goalsBalance = awayTeamInfo.goalsFavor - awayTeamInfo.goalsOwn;
        awayTeamInfo.efficiency = Number((
          (awayTeamInfo.totalPoints / (awayTeamInfo.totalGames * 3)) * 100
        ).toFixed(2));
      });

    return awayTeamInfo;
  }

  private static getAllTeamsInformation(homeTeam: TeamPerformance[], awayTeam: TeamPerformance[]) {
    return homeTeam.map((home) => {
      const teamInfo = new Team(home.name);
      awayTeam.forEach((away) => {
        if (home.name === away.name) {
          teamInfo.totalPoints = home.totalPoints + away.totalPoints;
          teamInfo.totalVictories = home.totalVictories + away.totalVictories;
          teamInfo.totalDraws = home.totalDraws + away.totalDraws;
          teamInfo.totalLosses = home.totalLosses + away.totalLosses;
          teamInfo.goalsFavor = home.goalsFavor + away.goalsFavor;
          teamInfo.goalsOwn = home.goalsOwn + away.goalsOwn;
          teamInfo.totalGames = home.totalGames + away.totalGames;
          teamInfo.goalsBalance = teamInfo.goalsFavor - teamInfo.goalsOwn;
          teamInfo.efficiency = Number((
            (teamInfo.totalPoints / (teamInfo.totalGames * 3)) * 100
          ).toFixed(2));
        }
      }); return { ...teamInfo };
    });
  }

  public static sortTeams(teams: TeamPerformance[]) {
    return teams.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    });
  }

  public static async getHomeInfo() {
    const matches = await LeaderBoardService.getMatches();
    const teams = await LeaderBoardService.getTeams();
    const homeTeam = teams.map((team) => LeaderBoardService.getHomeTeamInformation(team, matches));

    return LeaderBoardService.sortTeams(homeTeam);
  }

  public static async getAwayInfo() {
    const matches = await LeaderBoardService.getMatches();
    const teams = await LeaderBoardService.getTeams();
    const homeTeam = teams.map((team) => LeaderBoardService.getAwayTeamInformation(team, matches));

    return LeaderBoardService.sortTeams(homeTeam);
  }

  public static async getAll() {
    const teams = await LeaderBoardService.getTeams();
    const matches = await LeaderBoardService.getMatches();

    const homeTeam = teams.map((team) => LeaderBoardService.getHomeTeamInformation(team, matches));
    const awayTeam = teams.map((team) => LeaderBoardService.getAwayTeamInformation(team, matches));

    const allTeams = LeaderBoardService.getAllTeamsInformation(homeTeam, awayTeam);

    return LeaderBoardService.sortTeams(allTeams);
  }
}

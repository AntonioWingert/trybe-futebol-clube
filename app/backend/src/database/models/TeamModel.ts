import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface TeamAttributes {
  id: number;
  teamName: string;
}

export type TeamCreationAttributes = Omit<TeamAttributes, 'id'>;

class TeamModel extends Model<TeamAttributes, TeamCreationAttributes> {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;

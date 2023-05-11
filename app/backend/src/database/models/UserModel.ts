import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id'>;

class UserModel extends Model <UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UserModel;

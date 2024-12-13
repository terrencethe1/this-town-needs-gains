import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  fName: string;
  lName: string;
  fitness_level?: 'beginner' | 'intermediate' | 'expert';
  weight?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public fName!: string;
  public lName!: string;
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fName: {
        type: DataTypes.STRING,
      },
      lName: {
        type: DataTypes.STRING,
      },
      fitness_level: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.NUMBER,
      }
    },
    {
      tableName: 'user',
      sequelize,
    }
  );

  return User;
}

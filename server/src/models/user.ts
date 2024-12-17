import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  fName: string;
  lName: string;
  username: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  weight?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'expert';
  fitnessGoals?: string;
  exercisePreferences?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public fName!: string;
  public lName!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 13;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  async checkPassword(testPassword: string) {
    return await bcrypt.compare(testPassword, this.password);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fName: {
        type: DataTypes.STRING,
      },
      lName: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.NUMBER,
      },
      fitnessLevel: {
        type: DataTypes.STRING,
      },
      fitnessGoals: {
        type: DataTypes.TEXT,
      },
      exercisePreferences: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: 'user',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    }
  );

  return User;
}

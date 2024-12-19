import { DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare age: CreationOptional<number>;
  declare gender: CreationOptional<string>;
  declare weight: CreationOptional<number>;
  declare fitnessLevel: CreationOptional<string>;
  declare fitnessGoals: CreationOptional<string>;
  declare exercisePreferences: CreationOptional<string>;

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 13);
  }

  async checkPassword(testPassword: string): Promise<boolean> {
    return await bcrypt.compare(testPassword, this.password);
  }
}

export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
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
        set(value: string) {
          this.setDataValue('email', value.toLowerCase());
        }
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other', 'prefer not to say'),
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      fitnessLevel: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: true,
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
          if (user.changed('password')) {
          await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}

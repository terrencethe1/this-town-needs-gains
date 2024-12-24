import { DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, type ForeignKey, } from 'sequelize';

import type { User } from './user'


export class Exercise extends Model<InferAttributes<Exercise>, InferCreationAttributes<Exercise>
> {
  declare id: CreationOptional<number>;
  declare exerciseName: string;
  declare userId: ForeignKey<User['id']>;

}

export function ExerciseFactory(sequelize: Sequelize): typeof Exercise {
  Exercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exerciseName: {
        type: DataTypes.STRING,

      },

    },
    {
      tableName: 'exercise',
      sequelize,
    }
  );

  return Exercise;
}

import { 
  DataTypes,
  Model,
  Sequelize,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

import { User } from './user';

/*
interface ExerciseAttributes {
  id: number;
  exerciseName: string;
  exerciseGroup: string;
  difficulty: string;
  muscleGroup: string;
  equipment: string;
  instructions: string;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, 'id'> {}
*/

export class Exercise extends Model<
InferAttributes<Exercise>, 
InferCreationAttributes<Exercise>
> {
  declare id: CreationOptional<number>;
  declare exerciseName: string;
  declare exerciseGroup: CreationOptional<string>;
  declare difficulty: CreationOptional<string>;
  declare muscleGroup: CreationOptional<string>;
  declare equipment: CreationOptional<string>;
  declare instructions: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
}

export function ExerciseFactory(sequelize: Sequelize) {
  Exercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exerciseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exerciseGroup: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.STRING,
      },
      muscleGroup: {
        type: DataTypes.STRING,
      },
      equipment: {
        type: DataTypes.STRING,
      },
      instructions: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: 'exercise',
      sequelize,
    }
  );

  return Exercise;
}

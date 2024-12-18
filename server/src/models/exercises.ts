import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ExerciseAttributes {
  id: number;
  exerciseName: string;
  // exerciseGroup: 'cardio' | 'olympic_weightlifting' | 'plyometrics' | 'powerlifting' | 'strength' | 'stretching' | 'strongman';
  // difficulty: 'beginner' | 'intermediate' | 'expert';
  // muscleGroup: 'abdominals' | 'abductors' | 'adductors' | 'biceps' | 'calves' | 'chest' | 'forearms' | 'glutes' | 'hamstrings' | 'lats' | 'lower_back' | 'middle_back' | 'neck' | 'quadriceps' | 'traps' | 'triceps';
  // equipment: string;
  // instructions: string;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, 'id'> {}

export class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes> implements ExerciseAttributes {
  public id!: number;
  public exerciseName!: string;
  // public exerciseGroup!: 'cardio' | 'olympic_weightlifting' | 'plyometrics' | 'powerlifting' | 'strength' | 'stretching' | 'strongman';
  // public difficulty!: 'beginner' | 'intermediate' | 'expert';
  // public muscleGroup!: 'abdominals' | 'abductors' | 'adductors' | 'biceps' | 'calves' | 'chest' | 'forearms' | 'glutes' | 'hamstrings' | 'lats' | 'lower_back' | 'middle_back' | 'neck' | 'quadriceps' | 'traps' | 'triceps';
  // public equipment!: string;
  // public instructions!: string;
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
        allowNull: false,
      },
      // exerciseGroup: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // difficulty: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // muscleGroup: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // equipment: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // instructions: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // }
    },
    {
      tableName: 'exercise',
      sequelize,
    }
  );

  return Exercise;
}

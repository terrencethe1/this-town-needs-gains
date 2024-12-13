import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface MealAttributes {
  id: number;
  mealName: string;
  ingredients: string;
  calories?: number;
  carbs?: number;
  fat?: number;
  protein?: number;
}

interface MealCreationAttributes extends Optional<MealAttributes, 'id'> {}

export class Meal extends Model<MealAttributes, MealCreationAttributes> implements MealAttributes {
  public id!: number;
  public mealName!: string;
  public ingredients!: string;
}

export function MealFactory(sequelize: Sequelize): typeof Meal {
  Meal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mealName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calories: {
        type: DataTypes.INTEGER,
      },
      carbs: {
        type: DataTypes.INTEGER,
      },
      fat: {
        type: DataTypes.INTEGER,
      },
      protein: {
        type: DataTypes.INTEGER,
      }
    },
    {
      tableName: 'meal',
      sequelize,
    }
  );

  return Meal;
}

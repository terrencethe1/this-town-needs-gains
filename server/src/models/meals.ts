import { 
  DataTypes,
  Model,
  Sequelize,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

import type { User } from './user';

/*
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
*/

export class Meal extends Model<
InferAttributes<Meal>, 
InferCreationAttributes<Meal>
> {
  declare id: CreationOptional<number>;
  declare mealName: string;
  declare ingredients: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
}

export function MealFactory(sequelize: Sequelize) {
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
      }
    },
    {
      tableName: 'meal',
      sequelize,
    }
  );

  return Meal;
}

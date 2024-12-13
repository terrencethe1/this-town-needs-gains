import sequelize from '../config/connection.js';

import { UserFactory } from './user.js';
import { MealFactory } from './meals.js';
import { ExerciseFactory } from './exercises.js';

const User = UserFactory(sequelize);
const Meal = MealFactory(sequelize);
const Exercise = ExerciseFactory(sequelize);

User.hasMany(Meal, { foreignKey: 'assignedMealId'});
Meal.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

User.hasMany(Exercise, { foreignKey: 'assignedExerciseId'});
Exercise.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { User, Meal, Exercise };
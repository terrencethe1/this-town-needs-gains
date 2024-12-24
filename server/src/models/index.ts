import { sequelize }  from './db.js';
import { UserFactory } from './user.js';
import { MealFactory } from './meals.js';
import { ExerciseFactory } from './exercises.js';

const User = UserFactory(sequelize);
const Meal = MealFactory(sequelize);
const Exercise = ExerciseFactory(sequelize);

User.hasMany(Meal, { foreignKey: 'userId', onDelete: 'CASCADE' } );
Meal.belongsTo(User, { foreignKey: 'userId' } /*, { foreignKey: 'assignedUserId', as: 'assignedUser'} */);

User.hasMany(Exercise, { foreignKey: 'userId', onDelete: 'CASCADE'} );
Exercise.belongsTo(User, { foreignKey: 'userId' } /*, { foreignKey: 'assignedUserId', as: 'assignedUser'} */);

export { User, Meal, Exercise };
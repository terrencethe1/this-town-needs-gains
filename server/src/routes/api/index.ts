import { Router } from 'express';

import { mealRouter } from './meal-routes.js';
import { exerciseRouter } from './exercise-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/meals', mealRouter);
router.use('/exercises', exerciseRouter);
router.use('/user', userRouter);

export default router;

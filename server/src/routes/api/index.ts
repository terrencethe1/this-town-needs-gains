import { Router } from 'express';

import { mealRouter } from './meal-routes.js';
import { exerciseRouter } from './exercise-routes.js';

const router = Router();

router.use('/meals', mealRouter);
router.use('/exercises', exerciseRouter);

export default router;

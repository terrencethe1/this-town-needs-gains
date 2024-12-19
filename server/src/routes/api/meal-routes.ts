import express from 'express';
import type { Request, Response } from 'express';
import { Meal } from '../../models/meals.js';

const router = express.Router();

// GET /meals - Get all saved meals
router.get('/', async (_req: Request, res: Response) => {
  try {
    const meals = await Meal.findAll();
    res.json(meals);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /meals - Create a new meal
router.post('/', async (req: Request, res: Response) => {
  const { mealName, ingredients } = req.body;
  try {
    const newMeal = await Meal.create({
      mealName, ingredients
    });
    res.status(201).json(newMeal);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /meals/:id - Delete a meal by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const meal = await Meal.findByPk(id);
    if(meal) {
      await meal.destroy();
      res.json({ message: 'Meal deleted' });
    } else {
      res.status(404).json({
        message: 'Meal not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as mealRouter };

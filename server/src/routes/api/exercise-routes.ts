import express from 'express';
import type { Request, Response } from 'express';
import { Exercise } from '../../models/exercises.js';

const router = express.Router();

// GET /exercise - Get all saved exercises
router.get('/', async (_req: Request, res: Response) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /exercises - Create a new exercise
router.post('/', async (req: Request, res: Response) => {
  const { exerciseName, exerciseGroup, difficulty, muscleGroup, equipment, instructions } = req.body;
  try {
    const newExercise = await Exercise.create({
      exerciseName, exerciseGroup, difficulty, muscleGroup, equipment, instructions
    });
    res.status(201).json(newExercise);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /exercises/:id - Delete an exercise by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByPk(id);
    if(exercise) {
      await exercise.destroy();
      res.json({ message: 'Exercise deleted' });
    } else {
      res.status(404).json({
        message: 'Exercise not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as exerciseRouter };

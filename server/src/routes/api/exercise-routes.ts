import express from 'express';
import type { Request, Response } from 'express';
import { Exercise } from '../../models/exercises.js';

const router = express.Router();

// GET /exercise - Get all saved exercises
router.get('/', async (req: Request, res: Response) => {
  const userId = req.headers.userid;
  console.log(req.headers);
  try {
    const exercises = await Exercise.findAll({
      where: {
        userId: parseInt(userId as string) 
      }
    });
    res.json(exercises);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /exercises - Create a new exercise
router.post('/', async (req: Request, res: Response) => {
  try {

    const exerciseName = req.body.exercise;
    console.log(exerciseName, typeof exerciseName);
    const userId = req.body.userId;
    console.log(userId);

    const newExercise = await Exercise.create({ exerciseName: exerciseName, userId: userId});

    res.status(200).json(newExercise);
  } catch (err) {
    res.status(400).json(err);
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

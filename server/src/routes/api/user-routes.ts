import express, { Request, Response } from 'express';
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const router = express.Router();

// GET /user - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /user/:username - Get a user by username
router.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /user/register - Create a new user
router.post('/register', async (req: Request, res: Response) => {
  console.log(req.body);
  /* const { fName, lName, username, email, password, age, gender, weight, fitnessLevel, fitnessGoals, exercisePreferences } = req.body; */

  try {
    /*
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    */
    console.log(`fname = ${req.body.userData.fName}`);
    const hashedPassword = await bcrypt.hash(req.body.userData.password, 13);
    console.log(hashedPassword);
    const newUser = await User.create({
      fName: req.body.userData.fName, lName: req.body.userData.lName, username: req.body.userData.username, email: req.body.userData.email, password: hashedPassword, age: req.body.userData.age, gender: req.body.userData.gender, weight: req.body.userData.weight, fitnessLevel: req.body.userData.fitnessLevel, fitnessGoals: req.body.userData.fitnessGoals, exercisePreferences: req.body.userData.exercisePreferences
    });

    /*
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );
    */
    
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// PUT /user/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /user/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };

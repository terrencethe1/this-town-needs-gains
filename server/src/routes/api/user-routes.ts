import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { pool } from '../../models/db.js';  

dotenv.config();

// const app = express();
const router = express.Router();
// const secretKey = process.env.JWT_SECRET_KEY || '';

// GET /users - Get all users
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

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
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

// POST /users - Create a new user
// app.post('/api/users', async (req: Request, res: Response) => {
//   const { fName, lName, username, email, password, age, gender, weight, fitnessLevel, fitnessGoals, exercisePreferences } = req.body; 

//   if (!fName || !lName || !username || !email || !password || !age || !gender || !weight || !fitnessLevel || !fitnessGoals || !exercisePreferences) {
//     return res.status(400).json({ message: 'Please fill out all fields' });
//   }

//   try {
//     const userExists = await pool.query('SELECT * FROM user WHERE username = $1', [username]);
//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO user (fName, lName, username, email, password, age, gender, weight, fitnessLevel, fitnessGoals, exercisePreferences) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
//       [fName, lName, username, email, hashedPassword, age, gender, weight, fitnessLevel, fitnessGoals, exercisePreferences]
//     ); 
//     const token = jwt.sign({ id: result.rows[0].id, email: result.rows[0].email }, secretKey, { expiresIn: '1h' });
    
//     res.status(201).json({ token });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//     }
//     return res.status(500).json({ message: 'Unexpected error' });
//   });



// PUT /users/:id - Update a user by id
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

// DELETE /users/:id - Delete a user by id
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

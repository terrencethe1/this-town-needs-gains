import express from 'express';
import { registerUser } from '../Controller/userController.js';
// import { registerUser, loginUser } from '../Controller/userController';

const router = express.Router();

// Registration Route
router.post('/register', registerUser);

// Login Route
// router.post('/login', loginUser);

export default router;

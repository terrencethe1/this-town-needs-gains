import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        age,
        gender,
        weight,
        fitnessLevel,
        fitnessGoals,
        exercisePreferences,
    } = req.body;

    try {
        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            weight,
            fitnessLevel,
            fitnessGoals,
            exercisePreferences,
        });

        // Generate JWT
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
    return;
}


    export const loginUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            return res.json({token, user: { id: user.id, username: user.username }});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    
        return;
    }

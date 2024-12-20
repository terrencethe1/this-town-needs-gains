import React, { useState } from 'react';
import styles from './LoginModal.module.css';

interface CreateProfileModalProps {
    onClose: () => void;
    onSuccessfulRegister: () => void;
}

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({onClose, onSuccessfulRegister}) => {

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 0,
        gender: '',
        weigth: 0,
        fitnessLevel: '',
        fitnessGoals: '',
        exercisePreferences: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify(formData)
            });       
               
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const { token } = data;

            if (token) {
                localStorage.setItem('token', token);               
            }


            onSuccessfulRegister();
            onClose();

        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setError('There was a problem with your fetch operation'); }
            console.log(formData);
    }




    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form onSubmit={handleSubmit}>
                    
                    <div className={styles["name-inputs"]}>
                        <div>
<label htmlFor="first-name">First Name:</label>
<input type="text" name="firstName" id="firstName" placeholder="Enter your first name here" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="last-name">Last Name:</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Enter your last name here" onChange={handleChange} required/>
                        </div>
                    </div>

                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Enter your username here" onChange={handleChange} required/>

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email here" onChange={handleChange} required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password here" onChange={handleChange} required/>

                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input type="password" name="confirm-pass" id="confirmPassword" placeholder="Confirm your password here" onChange={handleChange} required/>

                    <label htmlFor="age">Age:</label>
                    <input type="number" name="age" id="age" placeholder="Enter your age here" onChange={handleChange} min={1} max={120} />

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" onChange={handleChange} >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>                        
                    </select>

                    <label htmlFor="weight">Weight:</label>
                    <input type="number" name="weight" id="weight" onChange={handleChange} placeholder="Enter your weight here" min={1} />

                    <label htmlFor="fitness-level" >Fitness Level:</label>
                    <select name="fitness-level" id="fitnessLevel" onChange={handleChange} >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>

                    <label htmlFor="fitness-goals">Fitness Goals</label>
                    <textarea name="fitness-goals" id="fitnessGoals" placeholder="Describe your fitness goals (e.g., lose weight, gain muscle, improve endurance)" rows={4} onChange={handleChange}></textarea>
                    
                    <label htmlFor="exercise-preferences">Exercise Preferences:</label>
                    <select name="exercise-preferences" id="exercisePreferences" onChange={handleChange} >
                        <option value="">Select</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="balance">Balance</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>

                    {error && <p className={styles["error-message"]}>{error}</p>}

                    <div className={styles['form-btn']}>
                        <button className={styles["submit-btn"]} type="submit">Submit</button>
                        <button className={styles["close-btn"]} onClick={onClose}>Close</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
}
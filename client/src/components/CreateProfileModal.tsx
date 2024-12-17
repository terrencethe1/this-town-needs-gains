import React from 'react';
import styles from './LoginModal.module.css';

interface CreateProfileModalProps {
    onClose: () => void;
}


export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({onClose}) => {
    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form action="submit" method="POST">
                    <div className={styles["name-inputs"]}>
                        <div>
                            <label htmlFor="first-name">First Name:</label>
                            <input type="text" name="name" id={styles["first-name"]} placeholder="Enter your fist name here" required/>
                        </div>
                        <div>
                            <label htmlFor="last-name">Last Name:</label>
                            <input type="text" name="name" id={styles["last-name"]} placeholder="Enter your last name here" required/>
                        </div>
                    </div>

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email here" required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password here" required/>

                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input type="password" name="confirm-pass" id="confirm-pass" placeholder="Confirm your password here" required/>

                    <label htmlFor="age">Age:</label>
                    <input type="number" name="age" id="age" placeholder="Enter your age here" min={1} max={120} />

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Famale</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>                        
                    </select>

                    <label htmlFor="fitness-goals">Fitness Goals</label>
                    <textarea name="fitness-goals" id="fitness-goals" placeholder="Describe your fitness goals (e.g., lose weight, gain muscle, improve endurance)" rows={4} required></textarea>
                    
                    <label htmlFor="exercise-preferences">Exercise Preferences:</label>
                    <select name="exercise-preferences" id="exercice-preferences" >
                        <option value="">Select</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="balance">Balance</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>

                    <div className={styles['form-btn']}>
                        <button className={styles["submit-btn"]} type="submit">Submit</button>
                        <button className={styles["close-btn"]} onClick={onClose}>Close</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
}
import React from 'react';

interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {
    return (
        <div className='login-modal'>
            <div className='login-modal-content'>
                <button className="close-btn" onClick={onClose} ></button>
                <form action="submit" method="POST">
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" name="name" id="name" placeholder="Enter your fullname here" required/>

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email here" required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password here" required/>

                    <label htmlFor="age">Age:</label>
                    <input type="number" name="age" id="age" placeholder="Enter your age here" min={1} max={120} required/>

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Famale</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>                        
                    </select>

                    <label htmlFor="fitness-goals">Fitness Goals</label>
                    <textarea name="fitness-goals" id="fitness-goals" placeholder="Describe your fitness goals (e.g., lose weight, gain muscle, improve endurance)" rows={4} required></textarea>
                    
                    <label htmlFor="exercise-preferences">Exercise Preferences:</label>
                    <select name="exercise-preferences" id="exercice-preferences" required>
                        <option value="">Select</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="balance">Balance</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>

                </form>
            </div>
        </div>
    );
}
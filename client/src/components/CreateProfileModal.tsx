import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './LoginModal.module.css';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { Modal } from 'react-bootstrap';

interface CreateProfileModalProps {
    onClose: () => void;
    onSuccessfulRegister: () => void;
}


export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({onClose, onSuccessfulRegister}) => {

    const [userData, setUserData] = useState({
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 0,
        gender: '',
        weight: 0,
        fitnessLevel: '',
        fitnessGoals: '',
        exercisePreferences: '',
      });

      const [error, setError] = useState('');
    
      // Handle changes in the input fields
       const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLFormElement | HTMLSelectElement >) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      }; 
      console.log(userData);

      // Handle form submission
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        console.log(userData);
        try {
          // Send the user registration data to the server
          const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userData
            })
          });

          const data = response.json();
          console.log(data);
          const navigate = useNavigate();
          navigate('/profile');

          if (!response.ok) {
            throw new Error('Could not send data to server.')
          }
          
          onSuccessfulRegister();
            onClose();

        } catch (error) {
          console.error('Failed to add new user', error);
          setError('There was a problem with your fetch operation');  // Log any errors that occur
        }
      };


    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form onSubmit={handleSubmit} data-dismiss="modal">
                    <div className={styles["name-inputs"]}>
                        <div>
                            <label htmlFor="fName">First Name:</label>
                            <input 
                            type="text" 
                            name="fName" 
                            id={styles["first-name"]} 
                            placeholder="Enter your first name here" 
                            onChange={handleChange} 
                            value={userData.fName} 
                            required/>
                        </div>
                        <div>
                            <label htmlFor="lName">Last Name:</label>
                            <input 
                            type="text" 
                            name="lName" 
                            id={styles["last-name"]} 
                            placeholder="Enter your last name here" 
                            value={userData.lName}
                            onChange={handleChange} 
                            required/>
                        </div>
                    </div>

                    <label htmlFor="username">Username:</label>
                    <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Enter your username here" 
                    value={userData.username} 
                    onChange={handleChange} 
                    required/>

                    <label htmlFor="email">Email Address:</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Enter your email here" 
                    value={userData.email} 
                    onChange={handleChange} 
                    required/>

                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter your password here" 
                    value={userData.password} 
                    onChange={handleChange} 
                    required/>

                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input 
                    type="password" 
                    name="confirm-pass" 
                    id="confirm-pass" 
                    placeholder="Confirm your password here" 
                    value={userData.password} 
                    onChange={handleChange} 
                    required/>

                    <label htmlFor="age">Age:</label>
                    <input 
                    type="number" 
                    name="age" 
                    id="age" 
                    placeholder="Enter your age here" 
                    min={1} 
                    max={120} 
                    value={userData.age} 
                    onChange={handleChange} 
                    />

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Famale</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>                        
                    </select>

                    <label htmlFor="fitnessGoals">Fitness Goals</label>
                    <textarea 
                    name="fitnessGoals" 
                    id="fitness-goals" 
                    placeholder="Describe your fitness goals (e.g., lose weight, gain muscle, improve endurance)" 
                    rows={4} 
                    value={userData.fitnessGoals} 
                    onChange={handleChange} 
                    ></textarea>
                    
                    <label htmlFor="exercisePreferences">Exercise Preferences:</label>
                    <select name="exercisePreferences" id="exercice-preferences">
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
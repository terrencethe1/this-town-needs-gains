import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './LoginModal.module.css';
import AuthService from '../utils/auth';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {

    const [loginData, setLoginData] = useState({
            username: '',
            password: ''
          });
        
    // Handle changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value
        });
    }; 
    console.log(loginData);

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(loginData);
        try {
            // Send the user login data to the server
            // const response = await fetch('/auth/login', {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({
            //     loginData
            // })
            // });

            // if (!response.ok) {
            // throw new Error('Could not send data to server.')
            // }
            
            // const data = await login(loginData);
            // console.log(data);
            // AuthService.login(data.token);

            const data = await login(loginData);
            AuthService.login(data.token);
            const navigate = useNavigate();
            navigate('/profile');

        } catch (error) {
        
            console.error('Failed to log in', error);
              // Log any errors that occur
        }
    };

    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="email">Username:</label>
                    <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Enter your username here"
                    value={loginData.username || ''} 
                    onChange={handleChange} 
                    required/>

                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter your password here"
                    value={loginData.password || ''} 
                    onChange={handleChange}  
                    required/>

                    <div className={styles['form-btn']}>
                        <button className={styles["submit-btn"]} type="submit" >Submit</button>
                        <button className={styles["close-btn"]} onClick={onClose}>Close</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
}
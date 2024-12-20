import React from 'react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {
    // Login code here
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
           const data = await response.json();

           localStorage.setItem('token', data.token);
              onClose();
            }
            else {
                const errorData = await response.json();
                setError(errorData.error);                
            }
        } catch (error) {
            setError('An error occurred');
            console.error('An error occurred:', error);
        }
    };



    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Enter your username here" onChange={handleChange} required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password here" required/>

                    {error && <p className={styles['error-message']}>{error}</p>}
                    <div className={styles['form-btn']}>
                        <button className={styles["submit-btn"]} type="submit">Submit</button>
                        <button className={styles["close-btn"]} onClick={onClose}>Close</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
}
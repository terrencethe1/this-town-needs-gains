import React from 'react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {
    return (
        <div className={styles['login-modal']}>
            <div className={styles['login-modal-content']}>
                
                <form action="submit" method="POST">
                    
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Enter your username here" required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password here" required/>

                    <div className={styles['form-btn']}>
                        <button className={styles["submit-btn"]} type="submit">Submit</button>
                        <button className={styles["close-btn"]} onClick={onClose}>Close</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
}
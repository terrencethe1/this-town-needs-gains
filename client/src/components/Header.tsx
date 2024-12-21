import { useState } from 'react';
import TTNGLOGO from '../assets/images/TTNG-LOGO.png';
import { Link } from 'react-router-dom';
import { LoginModal } from './LoginModal';
import { CreateProfileModal } from './CreateProfileModal';



export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    closeLoginModal();
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

    return (
        <div className='header'>
          <div className='top-header'> 
          <a href="/"><img className='logo' src={TTNGLOGO}></img></a>
          <div className='header-btn'>
           {currentUser ? (
            <>
              <span className='welcome'>Welcome, {currentUser}</span>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <>
              <button className='login-btn' onClick={openLoginModal}>Login</button>
              <button className='signup-btn' onClick={openSignupModal}>Sign Up</button>
            </>
          )}
          </div>

          </div> 
          <nav className='nav-bar'>
             <Link to="/">Home</Link>
             <Link to="/profile">My Profile</Link>
             <Link to="/exercise">Exercise</Link>
             <Link to="/meals">Meals</Link>
          </nav>
          {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />}
          {isSignupModalOpen && <CreateProfileModal onClose={closeSignupModal} onSuccessfulRegister={openLoginModal} />}

        </div>
    );
} 
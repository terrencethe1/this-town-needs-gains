import { useState } from 'react';
import TTNGLOGO from '../assets/images/TTNG-LOGO.png';
import { Link } from 'react-router-dom';
import { LoginModal } from './LoginModal';


export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

    return (
        <div className='header'>
          <div className='top-header'> 
          <a href="/"><img className='logo' src={TTNGLOGO}></img></a>
          <button className='login-btn' onClick={openLoginModal}>Login</button>
          </div> 
          <nav className='nav-bar'>
             <Link to="/">Home</Link>
             <Link to="/profile">My Profile</Link>
             <Link to="/exercise">Excercise</Link>
             <Link to="/meals">Meals</Link>
          </nav>
          {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}

        </div>
    );
} 
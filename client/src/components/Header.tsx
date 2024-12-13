import TTNGLOGO from '../assets/images/TTNG-LOGO.png';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className='header'>
          <div className='top-header'> 
          <a href="/"><img className='logo' src={TTNGLOGO}></img></a>
          <button>Login</button>
          </div> 
          <nav className='nav-bar'>
             <Link to="/">Home</Link>
             <Link to="/profile">My Profile</Link>
             <Link to="/exercise">Excercise</Link>
             <Link to="/meals">Meals</Link>
          </nav>
          

        </div>
    );
} 
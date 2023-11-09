import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../auth/userContext';

function NavBar({ logout }){
  const { currentUser } = useContext(UserContext);

  function loginNav(){
    let path = '/users/member/'+currentUser.username;
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li className='me-3'>
          <NavLink to={path}>{currentUser.username}</NavLink>
        </li>
        <li className='me-3'>
          <NavLink to='/' onClick={logout}>Log Out</NavLink>
        </li>
      </ul>
    );
  };

  function logoutNav(){
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li className='me-3'>
          <NavLink to='/auth/register'>Register</NavLink>
        </li>
        <li className='me-3'>
          <NavLink to='/auth/login'>Log In</NavLink>
        </li>
      </ul>
    );
  };

  return (
    <nav className='navbar navbar-expand'>
      <div className='container-fluid'>
        <div className='navbar-header me-3'>
          <NavLink to='/' className='nav navbar-nav navbar-center'>Arcade-Alley</NavLink>
        </div>
        { currentUser ? loginNav() : logoutNav() }
      </div>
    </nav>
  );
};

export default NavBar;
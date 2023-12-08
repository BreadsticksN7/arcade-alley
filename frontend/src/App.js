import React, { useState, useEffect } from 'react';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
// Auth components
import useLocalStorage from './hooks/useLocalStorage';
import loginHelper from './middleware/loginHelper';
import UserContext from './auth/userContext';
// Common routes
import Home from './pages/home';
import NavBar from './pages/navbar';
import LoginForm from './auth/loginForm';
// Game routes
// User routes
import UserDetails from './pages/userRoutes/userDetails';

export const TOKEN_STORAGE_ID = 'arcade-alley';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  //const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser(){
      if(token){
        try{
          let { username } = decodeToken(token);
          loginHelper.token = token;
          let currentUser = await loginHelper.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch(err){
          setCurrentUser(null);
        }
      }
      //setInfoLoaded(true);
    }
    //setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(loginData){
    try{
      let token = await loginHelper.login(loginData);
      setToken(token);
      return { success: true };
    } catch(err){
      console.error('Login failed', err);
      return { success: false, err };
    }
  };

  async function logout(){
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavBar login={login} logout={logout}></NavBar>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<LoginForm login={login} />} />
            <Route path="/users/member/:username" element={<UserDetails />} />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
      </div>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import loginHelper from '../../middleware/loginHelper';

import LoadingSpinner from '../../components/loadingSpinner';

function UserDetails(){
  const { username } = useParams();
  const [ user, setUser ] = useState(null);

  const navigate = useNavigate();

  const updateProfile = () => {
    const path = `/users/member/${user.username}/profile`;
    navigate(path);
  }


  const routeInvalidUser = () => {
    const path = '/';
    navigate(path);
  }


  useEffect(() => {
    async function getCurrentUser(){
      try{
        let res = await loginHelper.getCurrentUser(username);
        setUser(res);
      } catch(err){
        return routeInvalidUser();
      }
    }
    getCurrentUser();
  }, [setUser]);

  if (!user) return <LoadingSpinner />;

  return (
    <div>
      <div><h2>{ user.username }</h2></div>
      <div>
          <button className='btn btn-info float-right me-2' onClick={updateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default UserDetails;
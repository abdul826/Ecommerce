import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const UserProtectedRoute = ({Components}) => {

    const navigate = useNavigate();

    const checkUserValid = ()=>{
        const login = localStorage.getItem('userToken');

        if(!login){
          toast.error("Please Login to access the page.");
          navigate('/login');
        }
    }

    useEffect(()=>{
      checkUserValid();
    },[])
  return (
    <div>
      <Components />
    </div>
  )
}

export default UserProtectedRoute
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminProtectedRoute = ({Components}) => {
  const navigate = useNavigate();

  const checkAdminValid = ()=>{
      const login = localStorage.getItem('adminToken');

      if(!login){
        toast.error("Please Login to access the page.");
        navigate('/admin/login');
      }
  }

  useEffect(()=>{
    checkAdminValid();
  },[])
return (
  <div>
    <Components />
  </div>
)
}
export default AdminProtectedRoute
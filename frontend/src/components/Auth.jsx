import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { isSuccess, isFailed, isLoading } from '../reducers/userReducer';
import { getUser } from '../actions/user';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';
// import { getUserProfile } from '../actions/user';
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.user);
  // const isLogged = Cookies.get('token');
  // dispatch(getUser());

  useEffect(() => {
    // const isLogged = Cookies.get('token');
    dispatch(getUser());

    setTimeout(() => {
      {
        data && data.role === 'admin' ? navigate('/admin/dashboard') : data && data.role === 'user' ? navigate('/user/dashboard') : navigate('/login');
      }
    }, 1000);
  }, []);

  return (
    <>
      <h1>Authenticating</h1>
    </>
  );
};
export default Auth;

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
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const isLogged = Cookies.get('token');

    if (isLogged && data) {
      // dispatch(getUser());

      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }, 1000);
    } else {
      navigate('/login');
    }

    // setInterval(() => {
    //   navigate('/login');
    // }, 21600);
  }, [dispatch]);

  return (
    <>
      <h1>Authenticating</h1>
    </>
  );
};
export default Auth;

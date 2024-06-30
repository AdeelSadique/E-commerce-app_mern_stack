import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Avatar, Box, Button, Container, HStack, Heading, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Colors } from 'chart.js';
import { getUser } from '../../actions/user';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Colors);
function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  let monthlyOrders = [];

  for (let i = 0; i < 30; i++) {
    monthlyOrders[i] = Math.floor(Math.random() * 100);
    monthlyOrders.push(monthlyOrders[i]);
  }
  let monthlyOrders2 = [];

  for (let i = 0; i < 30; i++) {
    monthlyOrders2[i] = Math.floor(Math.random() * 100);
    monthlyOrders2.push(monthlyOrders2[i]);
  }

  const lineState = {
    // labels: ['january', 'february', 'march', 'april'],
    labels: [...Array.from({ length: 30 }).keys()],
    datasets: [
      {
        label: 'Jan Orders',
        backgroundColor: 'black',
        hoverBackgroundColor: 'black',
        tension: 0.5,
        data: monthlyOrders,
      },
    ],
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <h1>data is loading</h1>
      ) : (
        <div>
          <h1>user</h1>
          <h4>{data.name}</h4>
          <h4>{data.email}</h4>
        </div>
      )}
    </>
  );
}

export default Profile;

import { Box, Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Colors } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Colors);
function Analytics() {
  const [orders, setOrders] = useState([]);
  let monthlyOrders = [];
  orders.map((ele) => {
    ele.status === 1 || ele.status === 2 ? monthlyOrders.push(ele.quantity) : '';
  });

  let lastTenOrders = monthlyOrders.length - 10;

  const lineState = {
    // labels: ['january', 'february', 'march', 'april'],
    labels: [...Array.from({ length: 10 }).keys()],
    datasets: [
      {
        label: 'Last 30 Orders',
        backgroundColor: 'black',
        hoverBackgroundColor: 'black',
        tension: 0.5,
        data: monthlyOrders.length < 10 ? monthlyOrders : monthlyOrders.slice(lastTenOrders, monthlyOrders.length),
      },
    ],
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // checkstatus is initially empty so it will fetch all orders and then with status
    axios
      .get(
        `http://localhost:4000/api/allOrders`,
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('too many requests');
        }
        console.log(err);
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      <Container maxW={'container.md'}>
        <Line data={lineState} />
      </Container>
    </>
  );
}

export default Analytics;

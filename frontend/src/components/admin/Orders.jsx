import { Button, ButtonGroup, Container, HStack, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [checkStatus, setCheckStatus] = useState('');
  const [statusOnUpdate, setStatusOnUpdate] = useState(true);

  const updateStatusHandler = (id, status) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/allOrders/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setStatusOnUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setCheckStatusHandler = (status) => {
    setCheckStatus(status);
    setStatusOnUpdate(true);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // checkstatus is initially empty so it will fetch all orders and then with status
    statusOnUpdate
      ? axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/allOrders?status=${checkStatus}`,
            {
              withCredentials: true,
            },
            { cancelToken: cancelToken }
          )
          .then((res) => {
            setOrders(res.data.orders);
            setStatusOnUpdate(false);
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log('too many requests');
            }
            console.log(err);
          })
      : '';

    return () => {
      cancelToken.cancel();
    };
  }, [checkStatus, statusOnUpdate]);
  return (
    <>
      <Container maxW={'full'} bgColor={'whitesmoke'}>
        <HStack w={'full'} justifyContent={'space-between'} p={4}>
          <Link to={'/admin/dashboard'}>
            <Button colorScheme='orange'>Home</Button>
          </Link>
          <ButtonGroup colorScheme='orange' variant={'outline'}>
            <Button onClick={() => setCheckStatusHandler('')}>All</Button>
            <Button onClick={() => setCheckStatusHandler('0')}>Processing</Button>
            <Button onClick={() => setCheckStatusHandler('1')}>Shipped</Button>
            <Button onClick={() => setCheckStatusHandler('2')}>Delivered</Button>
          </ButtonGroup>
          <Link to={'/admin/dashboard/orders/analytics'}>
            <Button colorScheme='orange'>Analytics</Button>
          </Link>
        </HStack>
        <Table variant={'striped'} size={'md'}>
          <Thead>
            <Th>S/N</Th>
            <Th>O_ID</Th>
            <Th>Placed_At</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
            <Th>Action</Th>
            <Th>More</Th>
          </Thead>
          <Tbody>
            {orders.map((order, i) => (
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{order._id}</Td>
                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                <Td color={order.status === 1 ? 'yellow.400' : order.status === 2 ? 'green' : 'red'}>
                  {order.status === 1 ? 'Shipped' : order.status === 2 ? 'Delivered' : 'Processing'}
                </Td>
                <Td color={order.paidStatus === 0 ? 'red' : 'green'}>{order.paidStatus === 1 ? 'Paid' : 'Pending'}</Td>
                <Td>
                  <Select size={'xs'} w={'100px'} onChange={(e) => updateStatusHandler(order._id, e.target.value)}>
                    <option defaultChecked>Choose</option>
                    <option value={1}>Shipped</option>
                    <option value={2}>Delivered</option>
                  </Select>
                </Td>
                <Td>
                  <Link to={`/orderDetails/${order._id}`}>
                    <Button>Details</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
const TrComponent = ({ order, i }) => (
  <Tr>
    <Td>{i + 1}</Td>
    <Td>{order._id}</Td>
    <Td>{order.product._id}</Td>
    <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
    <Td color={order.status === 1 ? 'yellow.400' : order.status === 2 ? 'green' : 'red'}>
      {order.status === 1 ? 'Shipped' : order.status === 2 ? 'Delivered' : 'Processing'}
    </Td>
    <Td>
      <Select size={'xs'} w={'100px'}>
        <option defaultChecked>Choose</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </Select>
    </Td>
    <Td>
      <Button>Manage</Button>
    </Td>
  </Tr>
);
export default Orders;

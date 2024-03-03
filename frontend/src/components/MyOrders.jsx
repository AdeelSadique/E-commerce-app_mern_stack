import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Heading, Container, VStack, Text, Divider, HStack, Image, Tag, Button } from '@chakra-ui/react';
import image1 from '../assets/1.jpg';
import { Link } from 'react-router-dom';
function MyOrders() {
  const [orders, setOrders] = useState([]);
  //   const [switcher, pageSwitcher] = useState(1);
  //   const [currentOrder, setCurrentOrder] = useState('');
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(
        'http://localhost:4000/api/myOrders',
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
  }, []);
  return (
    <>
      <Container maxW={'container.lg'} p={4} bgColor={'whitesmoke'}>
        <Heading my={4}>My Orders</Heading>

        {orders.map((order) => (
          <VStack bgColor={'white'} mb={4} p={4} borderRadius={'md'}>
            <HStack w={'full'} justifyContent={'space-between'}>
              <VStack alignItems={'flex-start'}>
                <Text>#{order._id}</Text>
                <Text>Placed at {new Date(order.createdAt).toLocaleString()}</Text>
              </VStack>
              <Link to={`/orderDetails/${order._id}`}>
                <Button size={'sm'} colorScheme='orange'>
                  Manage
                </Button>
              </Link>
            </HStack>
            <Divider />
            <HStack w={'full'} justifyContent={'space-between'}>
              <HStack w={'full'}>
                <Image aspectRatio={4 / 4} w={'20'} borderRadius={'md'} src={order.product.images[0].image1} />
                <Text noOfLines={2}>{order.product.name.substring(0, 240)}</Text>
              </HStack>
              <Text w={'full'}> Qty: {order.quantity}</Text>
              <Tag w={'40'}>{order.status === 2 ? 'Delivered' : order.status === 1 ? 'Shipped' : 'Processing'}</Tag>
            </HStack>
          </VStack>
        ))}
      </Container>
    </>
  );
}

export default MyOrders;

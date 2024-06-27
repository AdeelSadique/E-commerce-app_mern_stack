import React, { useEffect, useState } from 'react';
import { Container, HStack, Heading, Tag, Box, Button, Stack, Table, Tbody, Td, Th, Thead, Tr, Select, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions/products';
import axios from 'axios';
const Payment = () => {
  const toast = useToast();
  const [outStockItems, setOutStockItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [checkStatus, setCheckStatus] = useState('');
  const [statusOnUpdate, setStatusOnUpdate] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  const updatePaymentHandler = (id, status) => {
    // console.log(id, status);

    axios
      .put(
        `http://localhost:4000/api/updatePayment/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setStatusOnUpdate(true);
        toast({ title: 'Success', description: res.data.message, status: 'success', duration: 3000, isClosable: true, position: 'top' });
      })
      .catch((err) => {
        toast({ title: 'Error', description: res.data.message || 'Try again', status: 'error', duration: 3000, isClosable: true, position: 'top' });
        console.log(err);
      });
  };
  function paymentCalculationFunc(orders) {
    const pendingPayments = orders
      .filter((o) => o.paidStatus == '0')
      .map((o) => o.product.price)
      .reduce((pre, curr) => (pre += curr), 0);
    const totalRevenue = orders
      .filter((o) => o.paidStatus == '1')
      .map((o) => o.product.price)
      .reduce((pre, curr) => (pre += curr), 0);
    setPendingPayments(pendingPayments);
    setTotalRevenue(totalRevenue);
  }
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // checkstatus is initially empty so it will fetch all orders and then with status
    statusOnUpdate
      ? axios
          .get(
            `http://localhost:4000/api/allOrders`,
            {
              withCredentials: true,
            },
            { cancelToken: cancelToken }
          )
          .then((res) => {
            setOrders(res.data.orders);
            setStatusOnUpdate(false);
            paymentCalculationFunc(res.data.orders);
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
      <Container maxW={'container.lg'} p={4}>
        <Heading textAlign={'center'}>Handling Payments</Heading>
        <HStack w={'full'} m={4}>
          <Button position={'absolute'} top={'18%'} left={'2%'} size={'sm'} colorScheme='orange' onClick={() => history.back()}>
            Back
          </Button>
          <Tag size={'lg'} bgColor={'whitesmoke'} color={'green.700'}>
            Total Revenue : {totalRevenue && totalRevenue.toFixed(2)} pkr
          </Tag>
          <Tag size={'lg'} bgColor={'whitesmoke'} color={'red.500'}>
            Pending Payments : {pendingPayments && pendingPayments.toFixed(2)} pkr
          </Tag>
        </HStack>

        <Box w={'full'} h={'50vh'} overflowY={'auto'} mt={'2rem'}>
          <Table size={'sm'}>
            <Thead>
              <Th>S/N</Th>
              <Th>Product ID</Th>
              <Th>name</Th>
              <Th>Payment</Th>
              <Th>Action</Th>
            </Thead>
            <Tbody maxH={'20%'} h={'20'} overflowY={'auto'} scrollBehavior={'smooth'}>
              {orders.length === 0 ? (
                <Tr>
                  <Td colSpan={4}>Items not found</Td>
                </Tr>
              ) : (
                orders.map((product, i) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{product._id}</Td>
                    <Td>{product.name.substring(0, 20)}</Td>
                    <Td color={product.paidStatus === 0 ? 'red' : 'green'}>{product.paidStatus === 0 ? 'Pending' : 'Paid'}</Td>
                    <Td>
                      <Select size={'xs'} w={'100px'} onChange={(e) => updatePaymentHandler(product._id, e.target.value)}>
                        <option defaultChecked>Choose</option>
                        <option value={0}>Pending</option>
                        <option value={1}>Paid</option>
                      </Select>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  );
};

export default Payment;

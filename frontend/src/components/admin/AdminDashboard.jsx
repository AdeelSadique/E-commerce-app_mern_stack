import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const { loading, failed, data } = useSelector((state) => state.user);
  return (
    <>
      <Container maxW={'full'} bgColor={'whitesmoke'} p={4}>
        <Heading size={'md'} textAlign={'center'} m={4}>
          Dashboard
        </Heading>
        <Stack direction={['column', 'column', 'row', 'row']} w={'full'} spacing={4}>
          <BoxCard name={'Orders'} link={'/admin/dashboard/orders'} navigate={navigate} />
          <BoxCard name={'Products'} link={'/admin/dashboard/products'} navigate={navigate} />
          <BoxCard name={'Stock'} link={'/admin/dashboard/stock'} navigate={navigate} />
          <BoxCard name={'Payments'} link={'/admin/dashboard/payment'} navigate={navigate} />
        </Stack>
      </Container>
    </>
  );
}
const BoxCard = ({ name, navigate, link }) => (
  <Box
    w={'full'}
    h={'40vh'}
    bgColor={'white'}
    borderRadius={'lg'}
    _hover={{ border: '1px solid orange', cursor: 'pointer' }}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    onClick={() => navigate(link)}
  >
    <Text>{name}</Text>
  </Box>
);
export default AdminDashboard;

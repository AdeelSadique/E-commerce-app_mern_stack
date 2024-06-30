import { Avatar, Box, Button, Flex, HStack, Heading, Input, Stack, VStack, useToast } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Cookies, useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/user';
// import { isLoading } from '../reducers/userReducer';

function Login() {
  const { loading, failed } = useSelector((state) => state.user);
  // const { isFailed, isLoading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const dispatch = useDispatch();
  const loginHandler = () => {
    const cancelToken = axios.CancelToken.source();
    // dispatch(isLoading());
    // Cookie.remove('token', { path: '/', expires: new Date(Date.now()) });
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password }, {}, { cancelToken: cancelToken })
      .then((res) => {
        const { token } = res.data;
        // js-cookie takes values as 1 mean 1 day if want specific we do this
        Cookie.set('token', token, { path: '/', expires: new Date(Date.now() + 6 * 60 * 60 * 1000) });
        // const isLogged = Cookie.get('token');
        dispatch(getUser());
        navigate('/auth');
        // if (isLogged) {
        // } else {
        //   navigate('/login');
        //   toast({ title: 'Error', description: 'Try Again', status: 'error', duration: 3000, isClosable: true });
        // }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('too many requests');
        }
        toast({
          title: 'Error',
          description: 'Failed to login',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
    return () => {
      cancelToken.cancel();
    };
  };

  return (
    <>
      <HStack w={'full'} p={8}>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Heading>Welcome Back!</Heading>
        </Flex>
        <VStack w={'full'} borderRadius={'lg'} boxShadow={'lg'} p={4}>
          <Avatar size={'lg'} />

          <Input
            _autofill={true}
            type='email'
            focusBorderColor='orange.500'
            h={'14'}
            placeholder='Email Here'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            focusBorderColor='orange.500'
            h={'14'}
            placeholder='Password Here'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button w={'full'} colorScheme='orange' onClick={loginHandler}>
            Login
          </Button>
          <Button alignSelf={'flex-end'} variant={'link'}>
            <Link to={'/forgotPassword'}>Forgot Password? Reset</Link>
          </Button>
          <Button alignSelf={'flex-end'} variant={'link'}>
            <Link to={'/signup'}>Don't have an Account? Signup Now</Link>
          </Button>
        </VStack>
      </HStack>
    </>
  );
}

export default Login;

import { Avatar, Box, Button, Flex, HStack, Heading, Input, Stack, VStack, useToast } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Cookies, useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../actions/user';

function Login() {
  const { loading, failed } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const dispatch = useDispatch();
  const loginHandler = () => {
    const cancelToken = axios.CancelToken.source();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password }, { withCredentials: true }, { cancelToken: cancelToken })
      .then((res) => {
        const { token } = res.data;

        dispatch(getUser());
        setTimeout(() => {
          navigate('/auth');
          toast({ title: 'Success', description: 'Successfully Logged In', status: 'success', duration: 3000, isClosable: true });
        }, 1000);
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

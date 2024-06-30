import { Avatar, Box, Button, Flex, HStack, Heading, Input, Stack, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/user';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  const signupHandler = () => {
    const cancelToken = axios.CancelToken.source();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, { name, email, password, confirmPassword }, {}, { cancelToken: cancelToken })
      .then((res) => {
        const { token } = res.data;
        Cookies.set('token', token, { path: '/' });
        dispatch(getUser());
        toast({ title: 'Success', description: 'Successfully Registered', status: 'success', duration: 3000, isClosable: true });
        navigate('/auth');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('too many requests');
        }
        toast({
          title: 'Error',
          description: err.response.data.message ? err.response.data.message : 'Failed to register',
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
    <Fragment>
      <HStack w={'full'} p={8}>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Heading>Hello! Register Yourself</Heading>
        </Flex>
        <VStack w={'full'} borderRadius={'lg'} boxShadow={'lg'} p={4}>
          <Avatar size={'lg'} />

          <Input focusBorderColor='orange.500' h={'14'} placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input
            focusBorderColor='orange.500'
            h={'14'}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          />
          <Button w={'full'} colorScheme='orange' onClick={signupHandler}>
            Signup
          </Button>

          <Button alignSelf={'flex-end'} variant={'link'}>
            <Link to={'/login'}>Already have an Account? Login</Link>
          </Button>
        </VStack>
      </HStack>
    </Fragment>
  );
}

export default Signup;

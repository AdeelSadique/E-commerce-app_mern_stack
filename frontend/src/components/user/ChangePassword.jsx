import { Button, Container, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  const passwordUpdateHandler = () => {
    const cancelToken = axios.CancelToken.source();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updatePassword`,
        updatePassword,
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        console.log(res.data);
        navigate('/login');
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
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/me`,
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        // console.log(res);
        setUser(res.data.user);
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
    <Container maxW={'full'} p={4} bgColor={'whitesmoke'}>
      <Heading size={'md'}>Update Password</Heading>
      <VStack mx={'auto'} spacing={4} bgColor={'white'} maxW={'40%'} p={4} borderRadius={'lg'}>
        <FormControl isRequired>
          <FormLabel>Old Password</FormLabel>
          <Input focusBorderColor='orange.500' name='oldPassword' onChange={(e) => setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            focusBorderColor='orange.500'
            type='password'
            name='newPassword'
            onChange={(e) => setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            focusBorderColor='orange.500'
            type='password'
            name='confirmPassword'
            onChange={(e) => setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })}
          />
        </FormControl>
        <Button w={'full'} colorScheme='orange' onClick={passwordUpdateHandler}>
          Change Password
        </Button>
      </VStack>
    </Container>
  );
}

export default ChangePassword;

import { Avatar, Box, Button, Flex, HStack, Heading, Input, Stack, VStack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Fragment>
      <HStack w={'full'} p={8}>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Heading>Welcome Back!</Heading>
        </Flex>
        <VStack w={'full'} borderRadius={'lg'} boxShadow={'lg'} p={4}>
          <Avatar size={'lg'} />

          <Input focusBorderColor='orange.500' h={'14'} placeholder='Email Here' />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Password Here' />
          <Button w={'full'} colorScheme='orange'>
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
    </Fragment>
  );
}

export default Login;

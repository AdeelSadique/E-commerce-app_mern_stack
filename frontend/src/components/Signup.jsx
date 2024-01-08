import { Avatar, Box, Button, Flex, HStack, Heading, Input, Stack, VStack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <Fragment>
      <HStack w={'full'} p={8}>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Heading>Hello! Register Yourself</Heading>
        </Flex>
        <VStack w={'full'} borderRadius={'lg'} boxShadow={'lg'} p={4}>
          <Avatar size={'lg'} />

          <Input focusBorderColor='orange.500' h={'14'} placeholder='Full Name' />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Email Address' />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Password' />
          <Input focusBorderColor='orange.500' h={'14'} placeholder='Confirm Password' />
          <Button w={'full'} colorScheme='orange'>
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

import { Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import image1 from '../assets/react.svg';

function Footer() {
  return (
    <Stack direction={'row'} p={4} bgColor={'orange.500'}>
      <VStack w={'full'}>
        <Heading size={'md'}>Download Our App</Heading>
        <Text>Download App For Android & IOS</Text>
        <HStack>
          <Image src={image1} />
          <Image src={image1} />
        </HStack>
      </VStack>
      <VStack w={'full'}>
        <Heading size={'md'}>Apna Store</Heading>
        <Text>High Quality is out first priority</Text>
        <Text>Copyright 2024 &copy Apna Store</Text>
      </VStack>
      <VStack w={'full'}>
        <Heading size={'md'}>Follow US</Heading>
        <Button variant={'link'}>facebook</Button>
        <Button variant={'link'}>Youtube</Button>
        <Button variant={'link'}>Instagram</Button>
      </VStack>
    </Stack>
  );
}

export default Footer;

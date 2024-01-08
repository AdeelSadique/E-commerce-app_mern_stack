import { Box, Button, HStack, Heading, Input, Textarea, VStack } from '@chakra-ui/react';

const ShippingDetail = ({ props }) => (
  <Box p={4} w={'full'}>
    <HStack justifyContent={'space-between'}>
      <Heading textAlign={'center'} size={'md'}>
        Shipping Details
      </Heading>
      <Heading textAlign={'center'} size={'md'}>
        ID # 567873454
      </Heading>
    </HStack>

    <VStack p={4}>
      <HStack w={'full'}>
        <Input placeholder='Full Name' />
        <Input placeholder='Email Address' />
      </HStack>
      <Input placeholder='Contact Number' />
      <Textarea placeholder='Complete Address'></Textarea>
    </VStack>

    <VStack w={'full'} p={2} alignItems={'flex-end'}>
      <Button onClick={() => props.setActiveStep(2)} colorScheme='orange'>
        Next Step
      </Button>
    </VStack>
  </Box>
);

export default ShippingDetail;

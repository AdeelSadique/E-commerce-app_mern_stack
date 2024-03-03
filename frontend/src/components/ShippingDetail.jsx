import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react';
const ShippingDetail = ({ props }) => {
  return (
    <Box p={4} w={'full'} boxShadow={'lg'}>
      <HStack justifyContent={'space-between'}>
        <Heading textAlign={'center'} size={'md'}>
          Shipping Details
        </Heading>
        <Heading textAlign={'center'} size={'sm'}>
          #{props.findProduct._id}
        </Heading>
      </HStack>
      <VStack p={4}>
        <HStack w={'full'}>
          <FormControl isRequired>
            <FormLabel>Customer Name</FormLabel>
            <Input
              isRequired
              placeholder='Full Name'
              value={props.customerDetail.name}
              onChange={(e) => props.setCustomerDetail({ ...props.customerDetail, name: e.target.value })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Customer Email</FormLabel>
            <Input
              placeholder='ABC@Example.com'
              type='email'
              value={props.customerDetail.email}
              onChange={(e) => props.setCustomerDetail({ ...props.customerDetail, email: e.target.value })}
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>Customer Contact</FormLabel>
          <Input
            placeholder='03xxxxxxxx'
            type='number'
            value={props.customerDetail.contact}
            onChange={(e) => props.setCustomerDetail({ ...props.customerDetail, contact: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Shipping Address</FormLabel>
          <Textarea
            placeholder='Street#, City'
            value={props.customerDetail.address}
            onChange={(e) => props.setCustomerDetail({ ...props.customerDetail, address: e.target.value })}
          ></Textarea>
        </FormControl>
      </VStack>

      <VStack w={'full'} p={2} alignItems={'flex-end'}>
        <Button onClick={props.ErrorMessageHandler} colorScheme='orange'>
          Next Step
        </Button>
      </VStack>
    </Box>
  );
};

export default ShippingDetail;

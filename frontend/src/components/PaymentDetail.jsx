import { Box, Button, FormControl, FormLabel, HStack, Heading, Radio, RadioGroup, VStack } from '@chakra-ui/react';

const PaymentDetail = ({ props }) => (
  <Box p={4}>
    <HStack justifyContent={'space-between'}>
      <Heading textAlign={'center'} size={'md'}>
        Payment Details
      </Heading>
      <Heading textAlign={'center'} size={'md'}>
        ID #{props.findProduct._id}
      </Heading>
    </HStack>

    <VStack>
      <Heading size={'sm'}>Choose Your Payment Method</Heading>
      <FormControl>
        <RadioGroup defaultValue={'0'} _checked={'0'} onClick={(e) => props.setPaymentMethod(e.target.value)}>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Debit/Credit Card</FormLabel>
            <Radio value={'2'} />
          </HStack>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Easypesa/Jazzcash</FormLabel>
            <Radio value={'1'} />
          </HStack>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Cash on delivery</FormLabel>
            <Radio value={'0'} />
          </HStack>
        </RadioGroup>
      </FormControl>
    </VStack>

    <VStack w={'full'} p={2} alignItems={'flex-end'}>
      <Button onClick={() => props.newOrder()} colorScheme='orange'>
        Place Order
      </Button>
    </VStack>
  </Box>
);

export default PaymentDetail;

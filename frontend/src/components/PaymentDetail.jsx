import { Box, Button, FormControl, FormLabel, HStack, Heading, Radio, RadioGroup, VStack } from '@chakra-ui/react';

const PaymentDetail = ({ props }) => (
  <Box p={4}>
    <HStack justifyContent={'space-between'}>
      <Heading textAlign={'center'} size={'md'}>
        Payment Details
      </Heading>
      <Heading textAlign={'center'} size={'md'}>
        ID # 567873454
      </Heading>
    </HStack>

    <VStack>
      <Heading size={'sm'}>Choose Your Payment Method</Heading>
      <FormControl>
        <RadioGroup>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Debit/Credit Card</FormLabel>
            <Radio name='paymentMethod' value='debit' />
          </HStack>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Easypesa/Jazzcash</FormLabel>
            <Radio name='paymentMethod' value='easypesa' />
          </HStack>
          <HStack w={'60'} justifyContent={'space-between'}>
            <FormLabel>Cash on delivery</FormLabel>
            <Radio name='paymentMethod' value='cashondelivery' />
          </HStack>
        </RadioGroup>
      </FormControl>
    </VStack>

    <VStack w={'full'} p={2} alignItems={'flex-end'}>
      <Button onClick={() => props.setActiveStep(3)} colorScheme='orange'>
        Place Order
      </Button>
    </VStack>
  </Box>
);

export default PaymentDetail;

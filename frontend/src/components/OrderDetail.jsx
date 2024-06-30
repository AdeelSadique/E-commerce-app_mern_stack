import { Box, Button, Image, HStack, Heading, VStack, Divider } from '@chakra-ui/react';
const OrderDetail = ({ props }) => (
  <Box p={4} w={'full'} boxShadow={'lg'}>
    <HStack justifyContent={'space-between'}>
      <Heading textAlign={'center'} size={'md'}>
        Products Details
      </Heading>
    </HStack>

    <HStack justifyContent={'space-between'} w={'full'} mt={4} mx={'auto'} p={2} border={'1px solid gray'}>
      <Image src={props.findProduct.images && props.findProduct.images[0].image1} alt='Image not found' maxW={'20%'} />

      <Divider p={2} orientation='vertical' borderColor={'gray'} />
      <VStack alignItems={'flex-start'}>
        <Heading size={'xs'}>#{props.findProduct._id}</Heading>

        <Heading size={'xs'} textAlign={'center'}>
          {props.findProduct.name?.substring(0, 40)}
        </Heading>
        <VStack alignItems={'flex-start'}>
          <Heading size={'xs'} textAlign={'center'}>
            Item Price : {props.findProduct.price}
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Quantity : {props.quantity}x
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Shipping : {props.shippingCost}
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Tax : {props.tax}
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Total {Math.fround(props.quantity * props.findProduct.price + props.shippingCost).toFixed(2)} pkr
          </Heading>
        </VStack>
      </VStack>
    </HStack>
    <VStack w={'full'} p={2} alignItems={'flex-end'}>
      <Button onClick={() => props.setActiveStep(1)} colorScheme='orange'>
        Next Step
      </Button>
    </VStack>
  </Box>
);

export default OrderDetail;

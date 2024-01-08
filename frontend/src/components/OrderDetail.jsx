import { Box, Button, Image, HStack, Heading, VStack } from '@chakra-ui/react';
import image1 from '../assets/1.jpg';
const OrderDetail = ({ props }) => (
  <Box p={4} w={'full'}>
    <HStack justifyContent={'space-between'}>
      <Heading textAlign={'center'} size={'md'}>
        Products Details
      </Heading>
      <Heading textAlign={'center'} size={'md'}>
        ID # 567873454
      </Heading>
    </HStack>

    <HStack justifyContent={'space-between'} w={'80%'} mt={4} mx={'auto'} p={2} border={'1px solid black'}>
      <VStack>
        <Heading size={'xs'}>ID# 567hkj</Heading>
        <Image src={image1} maxW={20} />
      </VStack>

      <VStack justifyContent={'space-between'} alignItems={'flex-start'}>
        <Heading size={'xs'} textAlign={'center'}>
          Name
        </Heading>
        <VStack alignItems={'flex-start'}>
          <Heading size={'xs'} textAlign={'center'}>
            1x
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Shipping : 200
          </Heading>
          <Heading size={'xs'} textAlign={'center'}>
            Total 1200
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

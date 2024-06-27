import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Tag,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalCloseButton,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';

function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messageChange, setMessageChange] = useState('');
  const [updateFlag, setUpdateFlag] = useState(true);
  const sendMessage = (id) => {
    axios
      .put(
        `http://localhost:4000/api/chat/${id}`,
        { message: messageChange },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // setChat(res.data.order);
        console.log(res);
        setUpdateFlag(true);
        setMessageChange('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateFlag
      ? axios
          .get(`http://localhost:4000/api/orderDetails/${orderId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setOrderDetails(res.data.order);
          })
          .catch((err) => {
            console.log(err);
          })
      : '';
    setUpdateFlag(false);
  }, [updateFlag]);

  return (
    <Container maxW={'container.lg'} p={4} bgColor={'whitesmoke'}>
      <Button size={'sm'} ms={'-10vmax'} colorScheme='orange' onClick={() => history.back()}>
        Back
      </Button>
      <IconButton position={'fixed'} top={'85%'} left={'92%'} colorScheme='orange' borderRadius={'full'} w={'40px'} h={'40px'} onClick={onOpen}>
        <AiFillMessage size={'32'} />
      </IconButton>
      <VStack bgColor={'white'} mb={4} p={4} borderRadius={'md'}>
        <HStack w={'full'} justifyContent={'space-between'}>
          <VStack alignItems={'flex-start'}>
            <Heading size={'xs'}>#{orderDetails._id}</Heading>
            <Text>Placed at {new Date(orderDetails.createdAt).toLocaleString()}</Text>
          </VStack>
          <VStack alignItems={'flex-end'}>
            <Tag variant={'solid'}>RS {orderDetails.product?.price}</Tag>
            <Text size={'sm'}>
              Payment Mode <b>{orderDetails.paymentMethod == 2 ? 'Credit Card' : orderDetails.paymentMethod == 1 ? 'EasyPesa' : 'COD'}</b>
            </Text>
            <HStack>
              <Text size={'sm'}>Paid Status</Text>
              <Text size={'sm'} color={orderDetails.paidStatus == 1 ? 'green' : 'red'}>
                <b>{orderDetails.paidStatus == 1 ? 'Paid' : 'Not paid'}</b>
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Divider />
        <HStack w={'full'} justifyContent={'space-between'}>
          <HStack w={'full'}>
            <Image aspectRatio={4 / 4} w={'20'} borderRadius={'md'} src={orderDetails.product?.images[0].image1} />
            <Text noOfLines={2}>{orderDetails.product?.name.substring(0, 240)}</Text>
          </HStack>
          <HStack w={'full'}>
            <Heading size={'xs'}> Qty:</Heading>
            <Text>{orderDetails.quantity}</Text>
          </HStack>
          <Tag color={orderDetails.status === 2 ? 'green' : orderDetails.status === 1 ? 'yellow.500' : 'red'} w={'40'}>
            {orderDetails.status === 2 ? 'Delivered' : orderDetails.status === 1 ? 'Shipped' : 'Processing'}
          </Tag>
        </HStack>
      </VStack>

      <HStack w={'full'} spacing={4}>
        <VStack w={'full'} bgColor={'white'} borderRadius={'lg'} height={'50vh'} p={4} alignItems={'flex-start'}>
          <Heading size={'xs'} alignSelf={'flex-start'}>
            Shipping Information
          </Heading>
          <Text>{orderDetails.name}</Text>
          <Text>{orderDetails.email}</Text>
          <HStack w={'full'}>
            <Text w={'full'}>
              <Tag variant={'solid'}>Mailing</Tag>
              {orderDetails.address}
            </Text>
          </HStack>
          <Text>{orderDetails.contact}</Text>
        </VStack>
        <VStack w={'full'} height={'50vh'} bgColor={'white'} p={4} borderRadius={'lg'}>
          <Heading size={'sm'} alignSelf={'flex-start'}>
            Total Summary
          </Heading>
          <VStack w={'full'} justifyContent={'space-between'} h={'full'}>
            <Box w={'full'}>
              <HStack w={'full'} justifyContent={'space-between'}>
                <Heading size={'xs'}> Item Price</Heading>
                <Text>{orderDetails.product?.price}</Text>
              </HStack>

              <HStack w={'full'} justifyContent={'space-between'}>
                <Heading size={'xs'}> Shipping Cost</Heading>
                <Text>{orderDetails.shippingCost}</Text>
              </HStack>
              <HStack w={'full'} justifyContent={'space-between'}>
                <Heading size={'xs'}>Tax</Heading>
                <Text>0</Text>
              </HStack>
            </Box>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Heading size={'sm'}>Sub Total </Heading>
              <Heading size={'xs'}>{orderDetails.quantity * orderDetails.product?.price + orderDetails.shippingCost} Pkr</Heading>
            </HStack>
          </VStack>
        </VStack>
      </HStack>

      {/* modal for chat */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Chat with seller</ModalHeader>
          <ModalBody overflow={'auto'} w={'full'} maxH={'50vh'} style={window.scrollTo({ top: '-100px' })}>
            {orderDetails &&
              orderDetails.chat?.map((m) => (
                <VStack alignItems={m.role === 'admin' ? 'flex-end' : 'flex-start'}>
                  <Text>{m.message}</Text>
                  <Text fontSize={'xx-small'}>{new Date(m.time).toLocaleString()}</Text>
                </VStack>
              ))}
          </ModalBody>
          <ModalFooter>
            <HStack w={'full'}>
              <Textarea onChange={(e) => setMessageChange(e.target.value)} w={'full'} rows={1} placeholder='Message' value={messageChange}></Textarea>
              <IconButton onClick={() => sendMessage(orderId)}>
                <AiFillMessage />
              </IconButton>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default OrderDetails;

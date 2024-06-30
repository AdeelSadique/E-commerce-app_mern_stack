import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Tooltip, Legend, ArcElement, Title } from 'chart.js';
import chartJs from 'chart.js/auto';
chartJs.register(Tooltip, Legend, ArcElement, Title);
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions/products';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Stock = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { loading, data, failed, productCounts } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [outStockItems, setOutStockItems] = useState([]);
  const [stockPercentage, SetStockPercentage] = useState({ inStock: 0, outStock: 0 });
  const [outStockItemsFlag, setOutStockItemsFlag] = useState(true);
  const [newStock, setNewStock] = useState(0);
  const [productId, setProductId] = useState('');
  const lineState = {
    labels: ['InStock', 'OutOfStock'],
    datasets: [
      {
        label: '%',
        backgroundColor: ['green', 'red'],
        radius: '80%',
        data: [stockPercentage.inStock.toFixed(0), stockPercentage.outStock.toFixed(0)],
        hoverOffset: 2,
        responsive: true,
      },
    ],
  };

  const itemLessThanHandler = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products-getAllStock?lessThan=5`, { withCredentials: true })
      .then((res) => {
        setOutStockItems(res.data.ItemsLessThan);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stockUpdateHandler = (id) => {
    setProductId(id);
    onOpen();
  };
  const addStockHandler = (id, stock) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, { stock }, { withCredentials: true })
      .then((res) => {
        setOutStockItemsFlag(true);
        onClose();
        console.log(res.data);
        toast({ title: 'Success', description: 'Stock updated successfully', status: 'success', duration: 3000, isClosable: true });
      })
      .catch((err) => {
        toast({ title: 'Error', description: 'Failed to update stock', status: 'error', duration: 3000, isClosable: true });
        console.log(err);
      });
  };

  useEffect(() => {
    outStockItemsFlag
      ? axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/products-getAllStock`, { withCredentials: true })
          .then((res) => {
            setOutStockItems(res.data.outStockItems);
            SetStockPercentage({ inStock: res.data.inStockPercentage, outStock: res.data.outStockPercentage });
          })
          .catch((err) => {
            console.log(err);
          })
      : '';
    setOutStockItemsFlag(false);
  }, [outStockItemsFlag]);

  return (
    <Container maxW={'container.xl'} p={4} bgColor={'whitesmoke'}>
      <HStack w={'full'} justifyContent={'space-between'} p={4}>
        <Stack direction={'row'}>
          <Button colorScheme='orange' onClick={() => history.back()}>
            Back
          </Button>
          <Button colorScheme='orange' onClick={() => setOutStockItemsFlag(true)}>
            Out of Stock Items
          </Button>
          <Button colorScheme='orange' onClick={itemLessThanHandler}>
            Items less then 5{' '}
          </Button>
        </Stack>

        <Heading size={'lg'} me={8}>
          Stock Analysis
        </Heading>
      </HStack>
      <HStack justifyContent={'space-between'} alignItems={'flex-start'} w={'full'}>
        <Box w={'full'} h={'50vh'} overflowY={'auto'} mt={'2rem'}>
          <Table size={'sm'}>
            <Thead>
              <Th>S/N</Th>
              <Th>Product ID</Th>
              <Th>name</Th>
              <Th>Stock</Th>
              <Th>Action</Th>
            </Thead>
            <Tbody maxH={'20%'} h={'20'} overflowY={'auto'} scrollBehavior={'smooth'}>
              {outStockItems.length === 0 ? (
                <Tr>
                  <Td colSpan={4}>Items not found</Td>
                </Tr>
              ) : (
                outStockItems.map((product, i) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{product._id}</Td>
                    <Td>{product.name.substring(0, 20)}</Td>
                    <Td color={product.stock === 0 ? 'red' : product.stock <= 1 ? 'orange' : 'green'}>{product.stock === 0 ? 'outofstock' : product.stock}</Td>
                    <Td>
                      <Button size={'xs'} variant={'link'} onClick={() => stockUpdateHandler(product._id)}>
                        Add Stock
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        <Box bgColor={'white'} borderRadius={'md'}>
          <Doughnut data={lineState} />
        </Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput min={0} value={newStock} onChange={(e) => setNewStock(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' variant={'ghost'} mr={3} onClick={onClose} size={'sm'}>
              Close
            </Button>
            <Button colorScheme='orange' size={'sm'} onClick={() => addStockHandler(productId, newStock)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Stock;

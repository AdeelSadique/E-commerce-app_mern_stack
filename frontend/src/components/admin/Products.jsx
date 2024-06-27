import {
  Button,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Tag,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Image,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

const Products = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, data, failed, productCounts } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    images: '',
  });
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [updateProduct, setUpdateProduct] = useState(false);
  const [productId, setProductId] = useState('');

  const productEditHandler = (id) => {
    // alert(id);
    setUpdateProduct(true);
    setProductId(id);
    axios
      .get(`http://localhost:4000/api/product/${id}`, { withCredentials: true })
      .then((res) => {
        setProduct({ ...res.data.product });
        onOpen();
      })
      .catch((err) => {
        toast({ title: 'Error', description: 'Failed to upload product', status: 'error', duration: 3000, isClosable: true });
        console.log(err);
      });
  };
  const updateProductHandler = () => {
    axios
      .put(`http://localhost:4000/api/product/${productId}`, product, { withCredentials: true })
      .then((res) => {
        setProduct({ ...res.data.product });
        setUpdateProduct(false);
        // we will getAllProducts on update
        dispatch(getAllProducts(`http://localhost:4000/api/products?page=${currentPage}`));
        onClose();
        toast({ title: 'Success', description: 'Product updated successfully', status: 'success', duration: 3000, isClosable: true });
      })
      .catch((err) => {
        toast({ title: 'Error', description: 'Failed to update product', status: 'error', duration: 3000, isClosable: true });
        console.log(err);
      });
  };

  const addNewProductHandler = () => {
    setUpdateProduct(false);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('images', image1);
    formData.append('images', image2);
    axios
      .post(`http://localhost:4000/api/products`, formData, { withCredentials: true })
      .then((res) => {
        // we will fetch products on update
        dispatch(getAllProducts(`http://localhost:4000/api/products?page=${currentPage}`));
        onClose();
        if (res.data.success) {
          toast({ title: 'Success', description: 'Product added successfully', status: 'success', duration: 3000, isClosable: true });
        }
      })
      .catch((err) => {
        toast({ title: 'Error', description: 'Failed to upload product', status: 'error', duration: 3000, isClosable: true });
        console.log(err);
      });
  };

  const onCloseHandler = () => {
    onClose();
    setUpdateProduct(false);
    setProduct({ ...null });
  };

  useEffect(() => {
    dispatch(getAllProducts(`http://localhost:4000/api/products?page=${currentPage}`));
  }, [currentPage, dispatch]);
  return (
    <>
      <Container maxW={'container.lg'} p={4} bgColor={'whitesmoke'}>
        <Button colorScheme='orange' size={'sm'} onClick={() => history.back()}>
          Back
        </Button>
        <Heading size={'md'} textAlign={'center'}>
          Manage Products
        </Heading>
        <HStack w={'full'} justifyContent={'space-between'}>
          <Tag size={'lg'} bgColor={'white'}>
            Total Product : {productCounts}
          </Tag>
          {/* <Heading size={'sm'}>Total Product : {productCounts}</Heading> */}
          <Button colorScheme='orange' onClick={onOpen}>
            Add Product
          </Button>
        </HStack>

        <Table size={'sm'} mt={'2rem'}>
          <Thead>
            <Th>#ID</Th>
            <Th>name</Th>
            <Th>price</Th>
            <Th>Stock</Th>
            <Th>Action</Th>
          </Thead>
          <Tbody>
            {loading ? (
              <h1>Loading</h1>
            ) : (
              data &&
              data.map((product) => (
                <Tr>
                  <Td>{product._id}</Td>
                  <Td>{product.name.substring(0, 20)}</Td>
                  <Td>{product.price}</Td>
                  <Td color={product.stock === 0 ? 'red' : ''}>{product.stock === 0 ? 'outofstock' : product.stock}</Td>
                  <Td>
                    <Button size={'xs'} colorScheme='orange' onClick={() => productEditHandler(product._id)}>
                      Update
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        <ButtonGroup colorScheme='orange' p={4} size={'sm'} justifyContent={'center'} alignItems={'center'} mx={'auto'} w={'full'}>
          <Button isDisabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage((currentPage) => currentPage - 1)}>
            <AiOutlineArrowLeft />
          </Button>

          {productCounts ? (
            [...Array(Math.ceil(productCounts / 8)).keys()].map((p, i) => (
              <Button key={i} isDisabled={i + 1 == currentPage ? true : false} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Button>
            ))
          ) : (
            <Button>{loading}</Button>
          )}
          <Button isDisabled={currentPage >= Math.ceil(productCounts / 8) ? true : false} onClick={() => setCurrentPage((currentPage) => currentPage + 1)}>
            <AiOutlineArrowRight />
          </Button>
        </ButtonGroup>
      </Container>

      <Modal isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{updateProduct ? 'Update Product' : 'Add new Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Product Name' value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              </FormControl>
              <HStack w={'full'}>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input placeholder='Product Price' value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  {/* <Input placeholder='Product Category' /> */}
                  <Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                    <option defaultChecked>choose</option>
                    <option value="men's" defaultChecked>
                      Men's
                    </option>
                    <option value="women's">Women's</option>
                    <option value='electronics'>Electronics</option>
                    <option value='jewelery'>Jewelery</option>
                    <option value='food'>Food</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Stock</FormLabel>
                <Input type='number' placeholder='Add Stock' value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
              </FormControl>
              {updateProduct ? (
                ''
              ) : (
                <FormControl isRequired>
                  <FormLabel>Images</FormLabel>
                  <HStack>
                    <Input size={'xs'} type='file' onChange={(e) => setImage1(e.target.files[0])} />
                    <Input size={'xs'} type='file' onChange={(e) => setImage2(e.target.files[0])} />
                  </HStack>
                </FormControl>
              )}
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <HStack>
                  <Textarea
                    placeholder='Product Description'
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  ></Textarea>
                </HStack>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} variant='outline' onClick={onCloseHandler}>
              Close
            </Button>
            <Button colorScheme='orange' onClick={updateProduct ? updateProductHandler : addNewProductHandler}>
              {updateProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Products;

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  ButtonGroup,
  HStack,
} from '@chakra-ui/react';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import image1 from '../assets/1.jpg';
import image2 from '../assets/react.svg';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/index';
import axios from 'axios';
import productsData from './productsData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/products';
import SkeletonCard from './SkeletonCard';

const Home = () => {
  const dispatch = useDispatch();
  const { data, productCounts, loading } = useSelector((state) => state.product);
  // const [products, setProducts] = useState([]);
  // const [totalPages, setTotalPages] = useState(Math.ceil(productCounts / 8));
  const [currentPage, setCurrentPage] = useState(1);

  // const nextPageHandler = () => {
  //   setCurrentPage((currentPage) => currentPage + 1);
  // };
  // const previousPageHandler = () => {
  //   setCurrentPage((currentPage) => currentPage - 1);
  // };
  // const currentPageHandler = (page) => {
  //   setCurrentPage(page);
  // };

  useEffect(() => {
    dispatch(getAllProducts(`https://e-commerce-app-mern-stackback-git-bfb9e2-adeelsadiques-projects.vercel.app/api/products?page=${currentPage}`));
  }, [dispatch, currentPage]);
  return (
    <Fragment>
      <Stack direction={'row'} w={'full'} h={'70vh'} p={4} bgColor={'whitesmoke'}>
        <VStack w={'25%'} borderRadius={'md'} alignItems={'stretch'} bgColor={'white'} boxShadow={'xl'} p={2}>
          <Heading size={'md'} alignSelf={'start'}>
            Categories
          </Heading>
          <Link to={'products/category=food'}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Food
            </Button>
          </Link>
          <Link to={'products/category=electronics'}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Electronics
            </Button>
          </Link>
          <Link to={"products/category=men's clothing"}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Mens
            </Button>
          </Link>
          <Link to={"products/category=women's clothing"}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Womens
            </Button>
          </Link>
          <Link to={'products/category=jewelery'}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Jewelery
            </Button>
          </Link>
          <Link to={'products/category=electronics'}>
            <Button variant={'ghost'} w={'full'} _hover={{ bgColor: 'orange.500', color: 'white' }}>
              Electronics
            </Button>
          </Link>
        </VStack>

        <Box w={'75%'} zIndex={0} bgColor={'white'} boxShadow={'xl'} borderRadius={'md'}>
          <Carousel autoPlay interval={3000} infiniteLoop showStatus={false} showIndicators={false} showThumbs={false}>
            <Box>
              <Image w={'full'} h={'64.5vh'} borderRadius={'lg'} objectFit={'cover'} src={banner1} />
            </Box>
            <Box>
              <Image w={'full'} h={'64.5vh'} borderRadius={'lg'} src={banner2} />
            </Box>
            <Box>
              <Image w={'full'} h={'64.5vh'} borderRadius={'lg'} src={banner3} />
            </Box>
            <Box>
              <Image w={'full'} h={'64.5vh'} borderRadius={'lg'} src={banner4} />
            </Box>
          </Carousel>
        </Box>
      </Stack>

      {/* Feature Products */}

      <Box w={'full'} p={4} bgColor={'whitesmoke'}>
        <Heading size={'md'} w={'15%'} textAlign={'center'} mx={'auto'} borderBottom={'2px'}>
          Featured Products
        </Heading>
        <SimpleGrid templateColumns={'repeat(auto-fill, minmax(260px, 1fr))'} spacing={8} p={10}>
          {data == '' ? (
            <Heading size={'md'}>Products Not Found</Heading>
          ) : loading ? (
            [...Array.from({ length: 4 }).keys()].map((v) => <SkeletonCard key={v} />)
          ) : (
            data && data.map((product, i) => <ProductCard key={product._id} product={product} />)
          )}
        </SimpleGrid>
      </Box>

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
    </Fragment>
  );
};

export default Home;

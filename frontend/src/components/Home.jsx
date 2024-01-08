import { Box, Button, Card, CardBody, CardFooter, Grid, GridItem, Heading, Image, SimpleGrid, Stack, VStack, Text } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
// import products from './products';

function Home() {
  const product = [
    {
      id: '1hjkh',
      image: image2,
      name: 'Product Pic',
      price: 1500,
    },
    {
      id: '2klj',
      image: image1,
      name: 'Second Product',
      price: 200,
    },
  ];
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    // axios
    //   .get('https://fakestoreapi.com/products')
    //   .then((data) => {
    //     setProducts(data.data);
    //     // console.log(data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return (
    <Fragment>
      <Stack direction={'row'} w={'full'} h={'70vh'} p={4} bgColor={'whitesmoke'}>
        <VStack w={'25%'} borderRadius={'md'} alignItems={'stretch'} bgColor={'white'} boxShadow={'xl'} p={2}>
          <Heading size={'md'} alignSelf={'start'}>
            Categories
          </Heading>
          <Link to={'products/category='}>
            <Button variant={'link'} w={'full'}>
              All
            </Button>
          </Link>
          <Link to={'products/category=food'}>
            <Button variant={'link'} w={'full'}>
              Food
            </Button>
          </Link>
          <Link to={'products/category=electronics'}>
            <Button variant={'link'} w={'full'}>
              Electronics
            </Button>
          </Link>
          <Link to={"products/category=men's clothing"}>
            <Button variant={'link'} w={'full'}>
              Mens
            </Button>
          </Link>
          <Link to={"products/category=women's clothing"}>
            <Button variant={'link'} w={'full'}>
              Womens
            </Button>
          </Link>
          <Link to={'products/category=jewelery'}>
            <Button variant={'link'} w={'full'}>
              Jewelery
            </Button>
          </Link>
          <Link to={'products/category=electronics'}>
            <Button variant={'link'} w={'full'}>
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
        <SimpleGrid templateColumns={'repeat(auto-fill, minmax(240px, 1fr))'} spacing={8} p={10}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </SimpleGrid>
      </Box>
    </Fragment>
  );
}

export default Home;

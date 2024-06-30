import React, { useEffect, useState } from 'react';
import './products.css';
import { Box, Card, CardBody, CardFooter, CardHeader, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
function ProductCard({ product }) {
  return (
    <Link to={`/productDetail/${product._id}`}>
      <Card size={'sm'} _hover={{ cursor: 'pointer' }} bgColor={'white'} className='card' w={'full'} h={'full'}>
        <CardHeader>
          <Stack justifyContent={'flex-end'} alignItems={'flex-end'} w={'full'}>
            <ReactStars value={product.rating} edit={false} />
          </Stack>
          <Image src={product.images[0].image1} alt='Image not found' w={'80%'} mx={'auto'} aspectRatio={'3/3'} />
        </CardHeader>
        <CardBody>
          <VStack w={'full'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Heading size={'sm'}>{product.name?.substring(0, 20)}</Heading>
            {/* <details >{product.description}</details> */}
            <Text>{`${product.description?.substring(0, 50)}...`}</Text>
          </VStack>
        </CardBody>
        <CardFooter justifyContent={'space-between'}>
          <Heading size={'sm'}>Price {product.price}</Heading>
          <Text textAlign={'right'} color={`${product.stock ? 'green' : 'red'}`}>{`${product.stock ? 'inStock' : 'outOfStock'}`}</Text>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;

import React from 'react';
import image1 from '../assets/1.jpg';
import './products.css';
import { Card, CardBody, CardFooter, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function ProductCard({ product }) {
  return (
    <Link to={`/productDetail/id=${product.id}`}>
      <Card _hover={{ cursor: 'pointer' }} bgColor={'white'} className='card' w={'full'} h={'full'}>
        <CardBody>
          <Image src={product.image} w={'60%'} mx={'auto'} objectFit={'conver'} />
        </CardBody>
        <CardFooter>
          <VStack w={'full'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Heading size={'sm'}>{product.title}</Heading>
            <Text>
              {product.rating.rate} ({product.rating.count}) Rating
            </Text>
            <Heading size={'sm'}>Price {product.price}</Heading>
          </VStack>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;

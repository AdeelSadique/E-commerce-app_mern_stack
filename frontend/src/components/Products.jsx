import {
  Alert,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  VStack,
  transform,
} from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

import image1 from '../assets/1.jpg';
import productsData from './productsData';
function Products() {
  const { param } = useParams();
  const [rangePrice, setRangePrice] = useState([0, 50000]);
  const [rangeReview, setRangeReview] = useState([0, 5]);
  const [search, setSearch] = useState({ flag: false, data: '' });
  const [category, setCategory] = useState({ flag: false, data: '' });
  const [products, setProducts] = useState(productsData);

  const productArr = [
    {
      id: 1,
      category: 'mens',
      name: 'watch',
      price: '20000',
      image: image1,
      rating: 5,
    },
    {
      id: 2,
      category: 'electronics',
      name: 'mobile',
      price: '50000',
      image: image1,
      rating: 2,
    },
    {
      id: 3,
      category: 'mens',
      name: 'shoes',
      price: '20000',
      image: image1,
      rating: 5,
    },
    {
      id: 4,
      category: 'mens',
      name: 'shirts',
      price: '1000',
      image: image1,
      rating: 4,
    },
    {
      id: 5,
      category: 'womens',
      name: 'shirt',
      price: '1440',
      image: image1,
      rating: 4,
    },
    {
      id: 6,
      category: 'womens',
      name: 'ring',
      price: '1440',
      image: image1,
      rating: 5,
    },
    {
      id: 7,
      category: 'appliance',
      name: 'fridge',
      price: '1440',
      image: image1,
      rating: 2,
    },
    {
      id: 8,
      category: 'food',
      name: 'burger',
      price: '1440',
      image: image1,
      rating: 1,
    },
    {
      id: 9,
      category: 'food',
      name: 'pizza',
      price: '1440',
      image: image1,
      rating: 5,
    },
    {
      id: 10,
      category: 'electronics',
      name: 'oven',
      price: '1440',
      image: image1,
      rating: 5,
    },
  ];
  console.log(products);
  useEffect(() => {
    // funtion to check current parameter is category or search
    if (param != undefined && param.substring(0, 3) === 'cat') {
      setCategory({ flag: true, data: param.substring(9) });
    } else if (param != undefined && param.substring(0, 3) === 'sea') {
      setSearch({ flag: true, data: param.substring(7) });
    }
  }, [param, products, setCategory, setSearch, rangePrice, rangeReview]);
  return (
    <Fragment>
      <Box w={'full'} minH={'100vh'} bgColor={'whitesmoke'} p={8}>
        <Heading size={'md'} w={'full'} textAlign={'center'}>
          Products
        </Heading>
        <Divider m={4} borderColor={'blackAlpha.600'} />
        <Stack direction={'row'}>
          <VStack minW={'20%'} maxH={'100vh'} p={4} borderRadius={'lg'} bgColor={'white'}>
            <Heading size={'sm'} textAlign={'center'}>
              Price
            </Heading>
            {/* price range slider */}
            <RangeSliderComponent props={{ startValue: 0, endValue: 50000, func: setRangePrice, minValue: 0, maxValue: 100000 }} />
            <Text>{rangePrice[0] + '-' + rangePrice[1]}</Text>
            <Divider />
            <Heading size={'sm'} textAlign={'center'}>
              Reviews
            </Heading>
            {/* review range slider */}
            <RangeSliderComponent props={{ startValue: 0, endValue: 5, func: setRangeReview, minValue: 0, maxValue: 5 }} />
            <Text>{rangeReview[0] + '-' + rangeReview[1]}</Text>
            <Divider />

            <Heading size={'sm'}>Category</Heading>

            <VStack w={'full'} justifyContent={'flex-start'} alignItems={'flex-start'}>
              <Link to={'category='}>
                <Button variant={'link'} w={'full'}>
                  All
                </Button>
              </Link>
              <Link to={'category=food'}>
                <Button variant={'link'} w={'full'}>
                  Food
                </Button>
              </Link>
              <Link to={'category=electronics'}>
                <Button variant={'link'} w={'full'}>
                  Electronics
                </Button>
              </Link>
              <Link to={"category=men's clothing"}>
                <Button variant={'link'} w={'full'}>
                  Mens
                </Button>
              </Link>
              <Link to={"category=women's clothing"}>
                <Button variant={'link'} w={'full'}>
                  Womens
                </Button>
              </Link>
              <Link to={'category=jewelery'}>
                <Button variant={'link'} w={'full'}>
                  Jewelery
                </Button>
              </Link>
              <Link to={'category=electronics'}>
                <Button variant={'link'} w={'full'}>
                  Electronics
                </Button>
              </Link>
            </VStack>
          </VStack>
          <SimpleGrid
            w={'full'}
            maxH={'100vh'}
            overflowY={'auto'}
            borderRadius={'lg'}
            templateColumns={'repeat(auto-fill, minmax(220px, 1fr))'}
            spacing={4}
            p={2}
          >
            {category.flag
              ? products.map((product) =>
                  product.category.toLowerCase().match(category.data) &&
                  product.price >= rangePrice[0] &&
                  product.price <= rangePrice[1] &&
                  product.rating.rate >= rangeReview[0] &&
                  product.rating.rate <= rangeReview[1] ? (
                    <ProductCard product={product} />
                  ) : null
                )
              : search.flag
              ? products.map((product) =>
                  product.name.toLowerCase().match(search.data) &&
                  product.price >= rangePrice[0] &&
                  product.price <= rangePrice[1] &&
                  product.rating.rate >= rangeReview[0] &&
                  product.rating.rate <= rangeReview[1] ? (
                    <ProductCard product={product} />
                  ) : null
                )
              : rangePrice
              ? products.map((product) =>
                  product.category.toLowerCase().match(category.data) &&
                  product.price >= rangePrice[0] &&
                  product.price <= rangePrice[1] &&
                  product.rating.rate >= rangeReview[0] &&
                  product.rating.rate <= rangeReview[1] ? (
                    <ProductCard product={product} />
                  ) : (
                    ''
                  )
                )
              : rangeReview
              ? products.map((product) =>
                  product.category.toLowerCase().match(category.data) &&
                  product.price >= rangePrice[0] &&
                  product.price <= rangePrice[1] &&
                  product.rating.rate >= rangeReview[0] &&
                  product.rating.rate <= rangeReview[1] ? (
                    <ProductCard product={product} />
                  ) : (
                    ''
                  )
                )
              : products.map((product) => <ProductCard product={product} />)}
          </SimpleGrid>
        </Stack>
      </Box>
    </Fragment>
  );
}
const RangeSliderComponent = ({ props }) => (
  <RangeSlider
    defaultValue={[props.startValue, props.endValue]}
    min={props.minValue}
    max={props.maxValue}
    onChangeStart={(e) => props.func(e)}
    onChangeEnd={(e) => props.func(e)}
    zIndex={0}
  >
    <RangeSliderTrack>
      <RangeSliderFilledTrack />
    </RangeSliderTrack>
    <RangeSliderThumb index={0} />
    <RangeSliderThumb index={1} />
  </RangeSlider>
);

export default Products;

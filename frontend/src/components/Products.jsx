import {
  Alert,
  Box,
  Button,
  ButtonGroup,
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import image1 from '../assets/1.jpg';
import productsData from './productsData';
import axios, { Axios } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/products';
import SkeletonCard from './SkeletonCard';
function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, productCounts } = useSelector((state) => state.product);
  const { param } = useParams();
  const [rangePrice, setRangePrice] = useState([0, 1000]);
  const [rangeReview, setRangeReview] = useState([0, 5]);
  // const [products, setProducts] = useState([]);

  // const [totalPages, setTotalPages] = useState(Math.ceil(productCounts / 8));
  const [currentPage, setCurrentPage] = useState(1);

  const nextPageHandler = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    // axios
    //   .get(`http://127.0.0.1:4000/api/products?page=${currentPage}`)
    //   .then((data) => {
    //     const { products } = data.data;
    //     setProducts(products);
    //     // const TP = Math.floor(data.data.productCounts) / 8;
    //     // setTotalPages(TP);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const previousPageHandler = () => {
    setCurrentPage((currentPage) => currentPage - 1);

    // axios
    //   .get(`http://127.0.0.1:4000/api/products?page=${currentPage}`)
    //   .then((data) => {
    //     const { products } = data.data;
    //     setProducts(products);
    //     // const TP = Math.floor(data.data.productCounts) / 8;
    //     // setTotalPages(TP);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const currentPageHandler = (page) => {
    setCurrentPage(page);
    // axios
    //   .get(`http://127.0.0.1:4000/api/products?page=${page}`)
    //   .then((data) => {
    //     const { products } = data.data;
    //     setProducts(products);
    //     // const TP = Math.floor(data.data.productCounts) / 8;
    //     // setTotalPages(TP);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const resetFilter = () => {
    setRangePrice(() => [0, 2000]);
    setRangeReview(() => [0, 5]);
    // dispatch(getAllProducts(`http://127.0.0.1:4000/api/products?page=${currentPage}`));
  };

  useEffect(() => {
    // funtion to check current parameter is category or search

    const cancelToken = axios.CancelToken.source();

    if (param != undefined && param.substring(0, 3) === 'cat') {
      dispatch(
        getAllProducts(
          `http://127.0.0.1:4000/api/products?category=${param.substring(9)}&price[gte]=${rangePrice[0]}&price[lte]=${
            rangePrice[1]
          }&page=${currentPage}&rating[gte]=${rangeReview[0]}&rating[lte]=${rangeReview[1]}`
        )
      );
    } else if (param != undefined && param.substring(0, 3) === 'sea') {
      dispatch(
        getAllProducts(
          `http://127.0.0.1:4000/api/products?search=${param.substring(7)}&price[gte]=${rangePrice[0]}&price[lte]=${
            rangePrice[1]
          }&page=${currentPage}&rating[gte]=${rangeReview[0]}&rating[lte]=${rangeReview[1]}`
        )
      );
    } else if (param != undefined && param.substring(0, 3) === 'pri') {
      dispatch(
        getAllProducts(
          `http://127.0.0.1:4000/api/products?price=${param.substring(6)}&price[gte]=${rangePrice[0]}&price[lte]=${
            rangePrice[1]
          }&page=${currentPage}&rating[gte]=${rangeReview[0]}&rating[lte]=${rangeReview[1]}`
        )
      );
    } else if (setRangePrice || setRangeReview) {
      dispatch(
        getAllProducts(
          `${process.env.BASE_URI}/api/products?price[gte]=${rangePrice[0]}&price[lte]=${rangePrice[1]}&page=${currentPage}&rating[gte]=${rangeReview[0]}&rating[lte]=${rangeReview[1]}`
        )
      );
    } else {
      dispatch(getAllProducts(`${process.env.BASE_URI}/api/products?page=${currentPage}`));
    }
    return () => {
      cancelToken.cancel();
    };
  }, [param, dispatch, currentPage, rangePrice, rangeReview]);
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
            <RangeSliderComponent props={{ startValue: 0, endValue: 2000, func: setRangePrice, minValue: 0, maxValue: 2000 }} />
            <Text>{rangePrice[0] + '-' + rangePrice[1]}</Text>
            <Divider />
            <Heading size={'sm'} textAlign={'center'}>
              Reviews
            </Heading>
            {/* review range slider */}
            <RangeSliderComponent props={{ startValue: 0, endValue: 5, func: setRangeReview, minValue: 0, maxValue: 5 }} />
            <Text>{rangeReview[0] + '-' + rangeReview[1]}</Text>
            <Divider />
            <Button onClick={resetFilter} variant={'link'} size={'sm'}>
              Reset Filters
            </Button>
            <Divider />
            <Heading size={'sm'}>Category</Heading>

            <VStack w={'full'} justifyContent={'flex-start'} alignItems={'flex-start'}>
              <Link to={'/products'}>
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
            templateColumns={'repeat(auto-fill, minmax(260px, 1fr))'}
            spacing={4}
            p={2}
          >
            {loading
              ? [...Array.from({ length: 4 }).keys()].map((v, i) => <SkeletonCard key={i} />)
              : data.map((product) => <ProductCard key={product._id} product={product} />)}
          </SimpleGrid>
        </Stack>
        <ButtonGroup colorScheme='orange' p={4} size={'sm'} justifyContent={'center'} alignItems={'center'} mx={'auto'} w={'full'}>
          <Button isDisabled={currentPage === 1 ? true : false} onClick={previousPageHandler}>
            <AiOutlineArrowLeft />
          </Button>

          {[...Array(Math.ceil(productCounts / 8)).keys()].map((p, i) => (
            <Button key={i} isDisabled={i + 1 == currentPage ? true : false} onClick={() => currentPageHandler(i + 1)}>
              {i + 1}
            </Button>
          ))}
          <Button isDisabled={currentPage >= Math.ceil(productCounts / 8) ? true : false} onClick={nextPageHandler}>
            <AiOutlineArrowRight />
          </Button>
        </ButtonGroup>
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

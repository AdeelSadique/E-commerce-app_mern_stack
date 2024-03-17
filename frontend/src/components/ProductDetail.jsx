import { Box, Button, Container, Divider, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import image1 from '../assets/1.jpg';
import image2 from '../assets/react.svg';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

function ProductDetail() {
  const { productID } = useParams();
  const [findProduct, setFindProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const quantityHandler = (mode) => {
    if (mode === '+') {
      setQuantity((q) => q + 1);
      // setPriceChange(() => product.price * quantity);
      // setSubTotal(subTotal + product.price);
    } else {
      if (quantity <= 1) {
        setQuantity((q) => (q = 1));
      } else {
        setQuantity((q) => q - 1);
        // setSubTotal((t) => t * quantity);
        // setSubTotal(subTotal - product.price);
      }
    }
  };

  // add to cart handler
  const addToCartHndler = (id) => {
    const cancelToken = axios.CancelToken.source();
    axios
      .post(
        'http://localhost:4000/api/myCart',
        { productId: id },
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        alert('product is added');
        // setUser(res.data.user);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('too many requests');
        }
        // console.log(err);
        const { message } = err.response.data;
        alert(message || 'try again');
        console.log(message || err);
      });
    return () => {
      cancelToken.cancel();
    };
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(`http://127.0.0.1:4000/api/product/${productID}`, {}, { cancelToken: cancelToken })
      .then((data) => {
        const { product } = data.data;
        setFindProduct(product);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('too many requests');
        }
        console.log(err);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [productID, setFindProduct, quantity]);

  return (
    <Fragment>
      <Box maxW={'full'} p={6} border={'1px solid black'} my={'4'} mx={'16'} bgColor={'whitesmoke'}>
        <Stack direction={['column', 'row']} justifyContent={'space-evenly'} alignItems={'center'}>
          {/* carousel start */}
          <Box zIndex={0} w={'25%'} border={'1px solid red'} boxShadow={'xl'}>
            <Carousel showStatus={false} showArrows={false} showThumbs={false}>
              <Image w={'full'} borderRadius={'md'} objectFit={'cover'} src={findProduct.images && findProduct.images[0].image1} alt='Image not found' />
              {/* </Box>
              <Box> */}
              <Image borderRadius={'md'} objectFit={'cover'} src={findProduct.images && findProduct.images[0].image2} alt='Image not found' />
              {/* <Box>
              </Box> */}
            </Carousel>
          </Box>
          {/* carousel end */}

          <VStack w={'70%'} boxShadow={'xl'} p={4} alignItems={'flex-start'}>
            <Box alignSelf={'flex-end'}>
              <ReactStars value={findProduct.rating} edit={false} />
            </Box>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Heading size={'xs'}>{findProduct.name}</Heading>
            </HStack>
            <Divider borderColor={'black'} />
            <Heading size={'md'}>{findProduct.price}</Heading>

            <Divider borderColor={'black'} />

            <HStack>
              <Button colorScheme='orange' variant={'outline'} size={['xs', 'sm']} onClick={() => quantityHandler('-')}>
                -
              </Button>
              <label>{quantity}</label>
              <Button colorScheme='orange' variant={'outline'} size={['xs', 'sm']} onClick={() => quantityHandler('+')}>
                +
              </Button>
            </HStack>
            <Divider borderColor={'black'} />

            <HStack>
              <Heading size={'sm'}>Stock</Heading>
              <Text color={findProduct.stock ? 'green' : 'red'}>{findProduct.stock ? 'inStock' : 'outOfStock'}</Text>
            </HStack>
            <Divider borderColor={'black'} />
            <VStack>
              <Heading size={'sm'}>Description</Heading>
              <details>
                <summary>{findProduct.description?.substring(0, 100)}</summary>
                <p>{findProduct.description}</p>
              </details>
              {/* <Text>{findProduct.description}</Text> */}
            </VStack>

            <HStack justifyContent={'space-between'} w={'full'}>
              <HStack>
                <Button colorScheme='orange' variant={'outline'} onClick={() => addToCartHndler(findProduct._id)}>
                  Add to cart
                </Button>
                <Link to={`/cart/placeOrder/${[findProduct._id, quantity]}`}>
                  <Button colorScheme='orange' w={'full'}>
                    Buy Now
                  </Button>
                </Link>
              </HStack>
              <HStack>
                <Button size={'xs'} colorScheme='orange' variant={'outline'}>
                  Submit Review
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </Stack>
      </Box>
      <Container maxW={'container.lg'} p={4}>
        <Heading size={'md'} textAlign={'center'} p={4}>
          Reviews
        </Heading>
        <VStack p={4} maxH={'30vh'} w={'full'} overflow={'auto'} scrollBehavior={'smooth'} justifyContent={'flex-start'} alignItems={'flex-start'}>
          {findProduct.reviews?.map((r) => (
            <Box p={4} w={'full'}>
              <HStack justifyContent={'space-between'}>
                <Text>{r?.name || 'review not'}</Text>
                <Text>{r?.rating || ''}</Text>
              </HStack>
              <Text>{r?.comment || ''}</Text>
              <Divider borderColor={'black'} />
            </Box>
          ))}
        </VStack>
      </Container>
    </Fragment>
  );
}

export default ProductDetail;

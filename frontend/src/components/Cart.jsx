import { Button, Container, Divider, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import image1 from '../assets/1.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Cart() {
  const [cart, setCart] = useState([]);
  const [pageReloadOnDelede, setPageReloadOnDelede] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/myCart`,
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        setCart(res.data.products);
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
  }, [pageReloadOnDelede]);
  return (
    <Fragment>
      <Container maxW={'container.lg'} p={8}>
        <HStack bgColor={'orange.500'} p={2} w={'full'} justifyContent={'space-between'}>
          <Heading size={'sm'}>Product</Heading>
          <Heading size={'sm'}>Quantity</Heading>
          <Heading size={'sm'}>Subtotal</Heading>
        </HStack>
        {cart ? cart.map((p) => <CartComponent product={p} setPageReloadOnDelede={setPageReloadOnDelede} />) : <Heading size={'sm'}>Cart is empty</Heading>}
      </Container>
    </Fragment>
  );
}
const CartComponent = ({ product, setPageReloadOnDelede }) => {
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(product && product.price);
  const quantityHandler = (mode) => {
    if (mode === '+') {
      if (quantity >= product && product.stock) {
        setQuantity((product && product.stock) || 1);
      } else {
        setQuantity((q) => q + 1);
        setSubTotal(subTotal + product && product.price);
      }

      // setPriceChange(() => product.price * quantity);
    } else {
      if (quantity <= 1) {
        setQuantity((q) => (q = 1));
      } else {
        setQuantity((q) => q - 1);
        // setSubTotal((t) => t * quantity);
        setSubTotal(subTotal - product.price);
      }
    }
  };

  const deleteHandler = (productId) => {
    const cancelToken = axios.CancelToken.source();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/myCart/${productId}`,

        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        alert('product is deleted');
        setPageReloadOnDelede((pre) => !pre);
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
  };
  return (
    <>
      <Divider p={4} />
      <HStack p={2} w={'full'}>
        <VStack w={'full'}>
          <HStack>
            <Image src={product && product.images[0].image1} w={'30%'} />
            <VStack>
              <Text>{product && product.name}</Text>
              <Text>{product && product.price}</Text>
              <Button size={'xs'} variant={'link'} colorScheme='red' onClick={() => deleteHandler(product && product._id)}>
                Delete Item
              </Button>
            </VStack>
          </HStack>
        </VStack>

        <VStack w={'full'}>
          <Button size={'xs'} onClick={() => quantityHandler('+')}>
            +
          </Button>
          <label>{quantity}</label>
          <Button size={'xs'} onClick={() => quantityHandler('-')}>
            -
          </Button>
        </VStack>

        <VStack w={'full'} spacing={4}>
          <Heading size={'sm'} alignSelf={'flex-end'}>
            RS {product && product.price}
          </Heading>
          <Divider borderColor={'orange.500'} />
          <HStack w={'full'} justifyContent={'space-between'}>
            <Heading size={'sm'}>Gross Price</Heading>
            <Heading size={'sm'}>{Math.abs(subTotal).toFixed(2)}</Heading>
          </HStack>

          {product && product.stock == 0 ? (
            <Button size={'sm'} colorScheme='orange' w={'full'} isDisabled>
              outStock
            </Button>
          ) : (
            <Link to={`placeOrder/${[product && product._id, quantity]}`}>
              <Button size={'sm'} colorScheme='orange' w={'full'}>
                Checkout
              </Button>
            </Link>
          )}
        </VStack>
      </HStack>

      <Divider />
    </>
  );
};
export default Cart;

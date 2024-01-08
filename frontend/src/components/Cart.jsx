import { Button, Container, Divider, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import image1 from '../assets/1.jpg';
import { Link } from 'react-router-dom';
function Cart() {
  const products = [
    {
      id: 1,
      name: 'apple',
      price: 1500,
    },
    {
      id: 2,
      name: 'shirt',
      price: 800,
    },
    {
      id: 3,
      name: 'mobile',
      price: 15000,
    },
  ];
  return (
    <Fragment>
      <Container maxW={'container.lg'} p={8}>
        <HStack bgColor={'orange.500'} p={2} w={'full'} justifyContent={'space-between'}>
          <Heading size={'sm'}>Product</Heading>
          <Heading size={'sm'}>Quantity</Heading>
          <Heading size={'sm'}>Subtotal</Heading>
        </HStack>
        {products.map((p) => (
          <CartComponent product={{ id: p.id, name: p.name, price: p.price }} />
        ))}
      </Container>
    </Fragment>
  );
}
const CartComponent = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(product.price);
  const quantityHandler = (mode) => {
    if (mode === '+') {
      setQuantity((q) => q + 1);
      // setPriceChange(() => product.price * quantity);
      setSubTotal(subTotal + product.price);
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
  const deleteHandler = (id) => {
    alert('product is deleted id :' + id);
  };
  return (
    <>
      <HStack p={2} w={'full'}>
        <VStack w={'full'}>
          <HStack>
            <Image src={image1} w={'30%'} />
            <VStack>
              <Text>{product.name}</Text>
              <Text>{product.price}</Text>
              <Button size={'xs'} variant={'link'} colorScheme='red' onClick={() => deleteHandler(product.id)}>
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
            RS {product.price}
          </Heading>
          <Divider borderColor={'orange.500'} />
          <HStack w={'full'} justifyContent={'space-between'}>
            <Heading size={'sm'}>Gross Price</Heading>
            <Heading size={'sm'}>{subTotal}</Heading>
          </HStack>
          <Link to={`placeOrder/id=${[product.id, quantity]}`}>
            <Button size={'sm'} colorScheme='orange' w={'full'}>
              Checkout
            </Button>
          </Link>
        </VStack>
      </HStack>

      <Divider />
    </>
  );
};
export default Cart;

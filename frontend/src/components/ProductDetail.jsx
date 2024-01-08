import { Box, Button, Container, Divider, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import image1 from '../assets/1.jpg';
import image2 from '../assets/react.svg';
import { Carousel } from 'react-responsive-carousel';

function ProductDetail() {
  const { productID } = useParams();

  return (
    <Fragment>
      <Box maxW={'full'} p={6} border={'1px solid black'} my={'4'} mx={'16'} bgColor={'whitesmoke'}>
        <Stack direction={['column', 'row']} justifyContent={'center'} alignItems={'center'}>
          {/* carousel start */}
          <Box zIndex={0} w={'34%'} boxShadow={'xl'}>
            <Carousel showStatus={false} showArrows={false} showThumbs={false}>
              <Box>
                <Image borderRadius={'md'} objectFit={'cover'} src={image1} />
              </Box>
              <Box>
                <Image borderRadius={'md'} objectFit={'cover'} src={image2} />
              </Box>
            </Carousel>
          </Box>
          {/* carousel end */}

          <VStack w={'50%'} boxShadow={'xl'} p={4} alignItems={'flex-start'}>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Heading size={'md'}>Product name</Heading>

              <Text>**** Rating</Text>
            </HStack>
            <Divider borderColor={'black'} />
            <Heading size={'md'}>RS 1000</Heading>

            <Divider borderColor={'black'} />

            <HStack>
              <Button variant={'outline'} size={['xs', 'sm']}>
                -
              </Button>
              <label>1</label>
              <Button variant={'outline'} size={['xs', 'sm']}>
                +
              </Button>
            </HStack>
            <Divider borderColor={'black'} />

            <HStack>
              <Heading size={'sm'}>Status</Heading>
              <Text>InStock</Text>
            </HStack>
            <Divider borderColor={'black'} />
            <VStack>
              <Heading size={'sm'}>Description</Heading>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, molestiae eaque. Odit optio cupiditate quaerat, neque enim officiis doloribus
              </Text>
            </VStack>

            <HStack justifyContent={'space-between'} w={'full'}>
              <HStack>
                <Button>Add to cart</Button>
                <Button>Buy Now</Button>
              </HStack>
              <HStack>
                <Text>****</Text>
                <Button size={'xs'}>Submit Review</Button>
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
          <Box p={4} w={'full'}>
            <HStack justifyContent={'space-between'}>
              <Text>Name</Text>
              <Text>****</Text>
            </HStack>
            <Text>v good product</Text>
          </Box>
          <Divider borderColor={'black'} />
          <Box p={4}>
            <HStack justifyContent={'space-between'}>
              <Text>Name</Text>
              <Text>****</Text>
            </HStack>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod qui sapiente odio animi optio, consequuntur, vitae vero quis magni adipisci eum
              ducimus sunt a dolore? Atque molestiae nihil quam impedit.
            </Text>
          </Box>
          <Divider borderColor={'black'} />
          <Box p={4} w={'full'}>
            <HStack justifyContent={'space-between'}>
              <Text>Name</Text>
              <Text>****</Text>
            </HStack>
            <Text>v good product</Text>
          </Box>
          <Divider borderColor={'black'} />
        </VStack>
      </Container>
    </Fragment>
  );
}

export default ProductDetail;

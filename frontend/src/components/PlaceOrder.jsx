import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
  useSteps,
} from '@chakra-ui/react';
import OrderDetail from './OrderDetail';
import ShippingDetail from './ShippingDetail';
import PaymentDetail from './PaymentDetail';

import { AiOutlineArrowLeft } from 'react-icons/ai';

const steps = [
  { title: 'Detail', description: 'Product Details' },
  { title: 'Shipping', description: 'Shipping Details' },
  { title: 'Payemnt', description: 'Payment Details' },
];

function PlaceOrder() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(id.split(',')[1]);
  }, []);
  console.log(quantity);

  return (
    <>
      <Container maxW={['full', 'container.md']} p={[2, 4]} bgColor={'whitesmoke'}>
        <StepperComponent activeStep={activeStep} setActiveStep={setActiveStep} />
        <Divider m={4} borderColor={'orange.500'} />
        <IconButton colorScheme='orange' onClick={() => setActiveStep(activeStep <= 0 ? 0 : activeStep - 1)}>
          <AiOutlineArrowLeft />
        </IconButton>

        {activeStep === 0 ? (
          <OrderDetail props={{ setActiveStep }} />
        ) : activeStep === 1 ? (
          <ShippingDetail props={{ setActiveStep }} />
        ) : activeStep === 2 ? (
          <PaymentDetail props={{ activeStep, setActiveStep }} />
        ) : activeStep === 3 ? (
          <OrderBooked Link={Link} />
        ) : (
          <OrderDetail props={{ setActiveStep }} />
        )}
      </Container>
    </>
  );
}

const OrderBooked = ({ Link }) => (
  <Box p={4}>
    <Heading>Thank you your order is booked</Heading>
    <Link to={'/products'}>
      <Button colorScheme='orange'>Shop more </Button>
    </Link>
  </Box>
);
const StepperComponent = ({ activeStep, setActiveStep }) => (
  <Stepper bgColor={'white'} position={'sticky'} zIndex={1} p={[2, 4]} top={114} size={['xs', 'sm', 'md', 'lg']} colorScheme='orange' index={activeStep}>
    {steps.map((step, index) => (
      <Step key={index} onClick={() => setActiveStep(index)}>
        <StepIndicator>
          <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
        </StepIndicator>

        <Box flexShrink='0'>
          <StepTitle>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>

        <StepSeparator />
      </Step>
    ))}
  </Stepper>
);

export default PlaceOrder;

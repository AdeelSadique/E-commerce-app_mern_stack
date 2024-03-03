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
  Radio,
  RadioGroup,
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
  useToast,
} from '@chakra-ui/react';
import OrderDetail from './OrderDetail';
import ShippingDetail from './ShippingDetail';
import PaymentDetail from './PaymentDetail';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';

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
  const toast = useToast();

  const [findProduct, setFindProduct] = useState({});
  const [shippingCost, setShippingCost] = useState(200);
  const [tax, setTax] = useState(0);
  const [customerDetail, setCustomerDetail] = useState({ name: '', email: '', contact: '', address: '' });
  const [errorMessage, setErrorMessage] = useState({ flag: false, message: '' });
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [orderId, setOrderId] = useState('');

  const newOrder = () => {
    console.log(paymentMethod);
    const form = {
      quantity: id.split(',')[1],
      paymentMethod: paymentMethod,
      shippingCost: shippingCost,
      name: customerDetail.name,
      email: customerDetail.email,
      contact: customerDetail.contact,
      address: customerDetail.address,
    };

    const cancelToken = axios.CancelToken.source();
    axios
      .post(`http://localhost:4000/api/placeOrder/${findProduct._id}`, form, { withCredentials: true }, { cancelToken: cancelToken })
      .then((res) => {
        setOrderId(res.data.order._id);
        setActiveStep(3);
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

  const ErrorMessageHandler = () => {
    if (customerDetail.name == '') {
      // setErrorMessage({ flag: true, message: '' });
      // errorMessage.flag
      toast({ title: 'Validation Error', description: 'Name field is required', isClosable: true, duration: 1000, status: 'error' });
    } else if (customerDetail.email == '') {
      // setErrorMessage({ flag: true, message: 'Email field is required' });
      toast({ title: 'Validation Error', description: 'Email field is required', isClosable: true, duration: 1000, status: 'error' });
    } else if (customerDetail.contact == '' || customerDetail.contact.length < 11) {
      // setErrorMessage({ flag: true, message: 'Contact field is required' });
      toast({ title: 'Validation Error', description: 'Contact field is required and must be 11 digits', isClosable: true, duration: 1000, status: 'error' });
    } else if (customerDetail.address == '') {
      toast({ title: 'Validation Error', description: 'Address field is required', isClosable: true, duration: 1000, status: 'error' });
      // setErrorMessage({ flag: true, message: 'Address field is required' });
    } else {
      setActiveStep(2);
      // setErrorMessage({ flag: false });
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4000/api/product/${id.split(',')[0]}`)
      .then((data) => {
        const { product } = data.data;
        setFindProduct(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container bgColor={'whitesmoke'} maxW={['full', 'container.lg']} p={[2, 4]}>
        <StepperComponent activeStep={activeStep} setActiveStep={setActiveStep} />
        <Divider m={4} borderColor={'orange.500'} />
        <IconButton my={2} colorScheme='orange' onClick={() => setActiveStep(activeStep <= 0 ? 0 : activeStep - 1)}>
          <AiOutlineArrowLeft />
        </IconButton>

        {activeStep === 0 ? (
          <OrderDetail props={{ setActiveStep, findProduct, quantity: id.split(',')[1], shippingCost, tax }} />
        ) : activeStep === 1 ? (
          <ShippingDetail props={{ setActiveStep, findProduct, customerDetail, setCustomerDetail, ErrorMessageHandler, errorMessage }} />
        ) : activeStep === 2 ? (
          <PaymentDetail props={{ activeStep, setActiveStep, findProduct, newOrder, setPaymentMethod }} />
        ) : activeStep === 3 ? (
          <OrderBooked Link={Link} productId={orderId} />
        ) : null}
      </Container>
    </>
  );
}

const OrderBooked = ({ Link, productId }) => (
  <Box p={4}>
    <Heading color={'green'}>ID #{productId}</Heading>
    <Heading>Thank you your order is booked</Heading>
    <Link to={'/products'}>
      <Button colorScheme='orange'>Shop more </Button>
    </Link>
  </Box>
);
const StepperComponent = ({ activeStep, setActiveStep }) => (
  <Stepper
    boxShadow={'lg'}
    zIndex={1}
    bgColor={'white'}
    position={'sticky'}
    p={[2, 4]}
    top={114}
    size={['xs', 'sm', 'md', 'lg']}
    colorScheme='orange'
    index={activeStep}
  >
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

import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  AvatarBadge,
  Button,
  Heading,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import { FaCartArrowDown, FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import userContext from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/user';
// import isAuth from './auth';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState({ home: true, products: false, aboutus: false, contactus: false });
  const [searchChange, setSearchChange] = useState('');
  const { loading, data } = useSelector((state) => state.user);

  const activePageChacker = (path) => {
    if (path == '/') {
      setActivePage({ home: true });
    } else if (path == 'products') {
      setActivePage({ home: false, products: true });
    } else if (path == 'aboutus') {
      setActivePage({ home: false, aboutus: true });
    } else if (path == 'contactus') {
      setActivePage({ home: false, contactus: true });
    } else {
      setActivePage({ home: true });
    }
  };

  const searchHandler = () => {
    if (isNaN(searchChange)) {
      navigate(`/products/search=${searchChange}`);
    } else {
      navigate(`/products/price=${searchChange}`);
    }
  };
  const logoutHandler = () => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(
        `${process.env.BASE_URI}/api/logout`,
        {
          withCredentials: true,
        },
        { cancelToken: cancelToken }
      )
      .then((res) => {
        Cookies.remove('token', { path: '/' });
        navigate('/login');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          Cookies.remove('token', { path: '/' });
          navigate('/login');
          console.log('too many requests');
        }
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      {loading ? <Progress size='xs' isIndeterminate bgColor={'white'} colorScheme='orange' /> : ''}
      <Stack
        direction={['column', 'row']}
        w={'full'}
        h={'20vh'}
        bgColor={'orange.500'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={4}
        position={'sticky'}
        zIndex={10}
        top={0}
      >
        <Heading>Apna Store</Heading>

        <Stack direction={'row'}>
          <Link to={'/'} onClick={() => activePageChacker('/')}>
            <Button variant={'ghost'} isActive={activePage.home}>
              Home
            </Button>
          </Link>
          <Link to={'products'} onClick={() => activePageChacker('products')}>
            <Button variant={'ghost'} isActive={activePage.products}>
              Products
            </Button>
          </Link>
          <Link to={'aboutus'} onClick={() => activePageChacker('aboutus')}>
            <Button variant={'ghost'} isActive={activePage.aboutus}>
              About US
            </Button>
          </Link>
          <Link to={'contactus'} onClick={() => activePageChacker('contactus')}>
            <Button variant={'ghost'} isActive={activePage.contactus}>
              Contact US
            </Button>
          </Link>
        </Stack>

        <Stack direction={'row'} alignItems={'center'}>
          <Input type='search' value={searchChange} onChange={(e) => setSearchChange(e.target.value)} focusBorderColor='white' placeholder='Name/Price' />
          <Tooltip label='Search Products' hasArrow>
            <IconButton variant={'solid'} icon={<FaSearch size={'30'} />} onClick={searchHandler} />
          </Tooltip>

          <Link to={'cart'}>
            <Tooltip label='Cart Items' hasArrow>
              <IconButton variant={'ghost'} icon={<FaCartArrowDown size={'30'} />} />
            </Tooltip>
          </Link>
          {Cookies.get('token') ? (
            <Menu>
              <MenuButton _hover={{ cursor: 'pointer' }} variant={'ghost'} as={Avatar} icon={<Avatar name={data.role} />}></MenuButton>
              <MenuList zIndex={1}>
                {data && data.role === 'admin' ? (
                  <Link to={'/admin/dashboard'}>
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                ) : (
                  ''
                )}
                <Link to={data && data.role === 'admin' ? '/admin/profile' : 'user/dashboard'}>
                  <MenuItem>Profile</MenuItem>
                </Link>

                <Link to={'myOrders'}>
                  <MenuItem>Orders</MenuItem>
                </Link>

                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                <Link to={'user/dashboard/changePassword'}>
                  <MenuItem>Change Password</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          ) : (
            <Link to={'login'}>
              <Tooltip label='Login Here' hasArrow>
                <IconButton variant={'ghost'} icon={<MdLogin size={'30'} />} />
              </Tooltip>
            </Link>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Header;

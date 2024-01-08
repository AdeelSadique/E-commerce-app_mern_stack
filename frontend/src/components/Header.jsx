import React, { useEffect, useState } from 'react';
import { Button, Heading, IconButton, Image, Input, Stack } from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import { FaCartArrowDown, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [activePage, setActivePage] = useState({ home: true, products: false, aboutus: false, contactus: false });
  const [searchChange, setSearchChange] = useState('');

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

  // const searchHandler = (e) => {
  //   //search request to the backend

  // };
  return (
    <>
      <Stack
        direction={['column', 'row']}
        w={'full'}
        h={'20vh'}
        bgColor={'orange.500'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={4}
        position={'sticky'}
        zIndex={1}
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

        <Stack direction={'row'}>
          <Input type='search' value={searchChange} onChange={(e) => setSearchChange(e.target.value)} focusBorderColor='white' placeholder='Name/Price' />
          <Link to={`/products/search=${searchChange}`}>
            <IconButton variant={'solid'} icon={<FaSearch size={'30'} />} />
          </Link>
          <Link to={'cart'}>
            <IconButton variant={'ghost'} icon={<FaCartArrowDown size={'30'} />} />
          </Link>
          <Link to={'login'}>
            <IconButton variant={'ghost'} icon={<MdLogin size={'30'} />} />
          </Link>
        </Stack>
      </Stack>
    </>
  );
}

export default Header;

import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UiContext } from '../../context';

export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);  
  const { numberOfItems } = useContext(CartContext);  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const setColorButon = (path: string) => (asPath === path) ? 'primary' : 'info';

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };
  
  // Fix porque no anda autoFocus
  const textFieldInputFocus = (inputRef: any) => {
    if (inputRef && inputRef.node !== null) {
      setTimeout(() => {
        inputRef.focus()
      }, 100)
    }
    return inputRef;
  }
  let textFieldProps = { inputRef: textFieldInputFocus }      
  
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo | </Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box 
                sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                className='fadeIn'
            >
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={setColorButon('/category/men')}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={setColorButon('/category/women')}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={setColorButon('/category/kid')}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1} />

            {/* Desktop */}
            {
                isSearchVisible 
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className='fadeIn'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false) }
                                    >
                                    <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    ) : (
                        <IconButton
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                           <SearchOutlined />
                        </IconButton>
                    )
            }
            
            {/* Mobile */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none' } }}
                onClick={toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>   
                </Link>
            </NextLink>

            <Button 
                onClick={toggleSideMenu}
            >
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}

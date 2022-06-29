import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {

  const { asPath } = useRouter();

  const setColorButon = (path: string) => (asPath === path) ? 'primary' : 'info';
  
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

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>   
                </Link>
            </NextLink>

            <Button>Menu</Button>

        </Toolbar>
    </AppBar>
  )
}

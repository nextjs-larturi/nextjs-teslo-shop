import React from 'react';
import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';

export const EmptyPage = () => {
   return (
      <ShopLayout
         title='Empty Cart'
         pageDescription='No hay articulos en el carrito'
      >
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
         >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography marginLeft={2}>Su carrito está vacio</Typography>

              <NextLink href='/' passHref>
                <Link typography='h4' color='secondary'>
                  Regresar
                </Link>
              </NextLink>
            </Box>
         </Box>
      </ShopLayout>
   );
};

export default EmptyPage;

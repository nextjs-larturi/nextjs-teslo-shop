import React, { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, Button } from '@mui/material';
import { UiContext } from '../../context';

export const AdminNavbar = () => {
   const { toggleSideMenu } = useContext(UiContext);

   // Fix porque no anda autoFocus
   const textFieldInputFocus = (inputRef: any) => {
      if (inputRef && inputRef.node !== null) {
         setTimeout(() => {
            inputRef.focus();
         }, 100);
      }
      return inputRef;
   };

   return (
      <AppBar>
         <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
               <Link display='flex' alignItems='center'>
                  <Typography variant='h6'>Teslo | </Typography>
                  <Typography sx={{ ml: 0.5 }}>Shop</Typography>
               </Link>
            </NextLink>

            <Box flex={1} />

            <Button onClick={toggleSideMenu}>Menu</Button>
         </Toolbar>
      </AppBar>
   );
};

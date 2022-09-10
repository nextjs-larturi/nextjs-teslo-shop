import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   Grid,
   Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

export const CartPage = () => {
   const { isLoaded, cart, shippingAddress } = useContext(CartContext);

   const router = useRouter();

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }
   }, [isLoaded, cart, router]);

   if (!isLoaded || cart.length === 0) {
      return <></>;
   } else {
      return (
         <ShopLayout title={`Mi Carrito`} pageDescription='Carrito de compras'>
            <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
               Carrito
            </Typography>

            <Grid container>
               <Grid item xs={12} sm={7}>
                  <CartList editable={true} />
               </Grid>

               <Grid item xs={12} sm={5}>
                  <Card className='summary-card'>
                     <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ my: 1 }} />

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                           <Button
                              color='secondary'
                              className='circular-btn'
                              fullWidth
                              href={ shippingAddress?.address !== '' ? '/checkout/summary' : '/checkout/address'}
                           >
                              Checkout
                           </Button>
                        </Box>
                     </CardContent>
                  </Card>
               </Grid>
            </Grid>
         </ShopLayout>
      );
   }
};

export default CartPage;

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
   Button,
   Card,
   CardContent,
   Chip,
   Divider,
   Grid,
   Link,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { CartContext } from '../../context/cart/CartContext';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

export const SumaryPage = () => {
   const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const router = useRouter();

   useEffect(() => {
      if (!Cookies.get('firstName')) {
         router.push('/checkout/address');
      }
   }, [router]);

   const onCreateOrder = async () => {
      setIsPosting(true);
      const { hasError, message } = await createOrder();

      if (hasError){
         setIsPosting(false);
         setErrorMessage(message);
         return;
      }

      router.replace(`/orders/${message}`)

   }

   if (!shippingAddress) {
      return null;
   }

   const { address, city, country, firstName, lastName, phone, zip } =
      shippingAddress;

   return (
      <ShopLayout title='Resumen Orden' pageDescription='Resumen de la Orden'>
         <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
            Resumen de la Orden
         </Typography>

         <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>Resumen (3 productos)</Typography>
                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>
                           Destinatario
                        </Typography>
                        <NextLink href='/checkout/address' passHref>
                           <Link underline='always'>Editar</Link>
                        </NextLink>
                     </Box>

                     <Typography>
                        Destinatario: {firstName + ' ' + lastName}
                     </Typography>
                     <Typography>Teléfono: {phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>
                           Dirección de entrega
                        </Typography>
                        <NextLink href='/checkout/address' passHref>
                           <Link underline='always'>Editar</Link>
                        </NextLink>
                     </Box>

                     <Typography>Dirección: {address}</Typography>
                     <Typography>
                        Ciudad: {city + ' (' + zip + ') - '}
                        {countries.find((c) => c.code === country)?.name}
                     </Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='end'>
                        <NextLink href='/cart' passHref>
                           <Link underline='always'>Editar</Link>
                        </NextLink>
                     </Box>

                     <OrderSummary />

                     <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                        <Button
                           color='secondary'
                           className='circular-btn'
                           fullWidth
                           onClick={onCreateOrder}
                           disabled={isPosting}
                        >
                           Confirmar Orden
                        </Button>

                        <Chip 
                           color='error'
                           label={errorMessage}
                           sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                        />
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default SumaryPage;

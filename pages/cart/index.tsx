import React, { useContext } from 'react';
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

export const CartPage = () => {

  const { cart } = useContext(CartContext);

  return (
    <ShopLayout
        title={`Mi Carrito: (${cart.length} productos)`}
        pageDescription='Carrito de compras'
    >
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>
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
                        <Divider sx={{ my: 1}} />

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage;

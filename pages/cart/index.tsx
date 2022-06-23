import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from './CartList';

export const CartPage = () => {
  return (
    <ShopLayout
        title='Carrito (3)'
        pageDescription='Carrito de compras'
    >
        <Typography variant='h1' component='h1'>
            Carrito
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ my: 1}} />

                        {/* Order Sumary */}

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

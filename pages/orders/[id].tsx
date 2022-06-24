import React from 'react';
import NextLink from 'next/link';
import { Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

export const OrderPage = () => {
  return (
    <ShopLayout
        title='Orden #4435665'
        pageDescription='Resumen de la Orden #4435665'
    >
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>
            Orden #4435665
        </Typography>

        {/* <Chip 
            sx={{ my:2 }}
            label='Pendiente de pago'
            variant='outlined'
            color='error'
            icon = {<CreditCardOffOutlined />}
        /> */}

        <Chip 
            sx={{ my:2 }}
            label='Pago realizado'
            variant='outlined'
            color='success'
            icon = {<CreditScoreOutlined />}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my: 1}} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>Editar</Link>
                            </NextLink>
                        </Box>

                        <Typography>Leandro Arturi</Typography>
                        <Typography>Avenida Tesla 1212, C2443</Typography>
                        <Typography>CABA - Argentina</Typography>
                        <Typography>11 44554444</Typography>

                        <Divider sx={{ my: 1}} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>Editar</Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <h1>Pagar</h1>

                            <Chip 
                                sx={{ my:2 }}
                                label='Pago realizado'
                                variant='outlined'
                                color='success'
                                icon = {<CreditScoreOutlined />}
                            />
                            
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage;

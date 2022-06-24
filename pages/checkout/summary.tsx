import React from 'react';
import NextLink from 'next/link';
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';

export const SumaryPage = () => {
  return (
    <ShopLayout
        title='Resumen Orden'
        pageDescription='Resumen de la Orden'
    >
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>
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
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SumaryPage;

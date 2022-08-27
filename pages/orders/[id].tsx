import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder
}

export const OrderPage: NextPage<Props> = ({order}) => {

  const { shippingAddress } = order;

  return (
    <ShopLayout
        title={`Resumen de la Orden`}
        pageDescription={`Resumen de la Orden #${order._id}`}
    >
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>
            {`Orden #${order._id}`}
        </Typography>

        {
            order.isPaid ? (
                <Chip 
                    sx={{ my:2 }}
                    label='Pago realizado'
                    variant='outlined'
                    color='success'
                    icon = {<CreditScoreOutlined />}
                />
            ) : (
                <Chip 
                    sx={{ my:2 }}
                    label='Pendiente de pago'
                    variant='outlined'
                    color='error'
                    icon = {<CreditCardOffOutlined />}
                />
            )
        }

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false} products={order.orderItems} />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>{`Resumen (${order.numberOfItems} ${order.numberOfItems > 1 ? 'productos' : 'producto'})`}</Typography>
                        <Divider sx={{ my: 1}} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>Editar</Link>
                            </NextLink>
                        </Box>

                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.address } ({ shippingAddress.zip })</Typography>
                        <Typography>{ shippingAddress.city }, { shippingAddress.country }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my: 1}} />

                        <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subtotal: order.subtotal,
                                total: order.total,
                                tax: order.tax,
                            }}
                        />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                            {
                                order.isPaid ? (
                                    <Chip 
                                    sx={{ my:2 }}
                                    label='Pago realizado'
                                    variant='outlined'
                                    color='success'
                                    icon = {<CreditScoreOutlined />}
                                />
                                ) : (
                                    <h1>Pagar</h1>
                                )
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const { id = '' } = query;

    const session: any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: `/auth/login?p=orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if(!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if(order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;

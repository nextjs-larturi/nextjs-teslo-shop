import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { tesloApi } from '../../api';

interface Props {
    order: IOrder
}

export type OrderResponseBody = {
    id: string;
    status :
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED'
}

export const OrderPage: NextPage<Props> = ({order}) => {

  const router = useRouter();

  const [isPaying, setIsPaying] = useState(false);

  const { shippingAddress } = order;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if(details.status !== 'COMPLETED') {
        return alert('No hay Pago en paypal');
    }

    setIsPaying(true);

    try {
        const {data} = await tesloApi.post(`/orders/pay`, {
            transactionId: details.id,
            orderId: order._id
        });

        router.reload();
    } catch (error) {
        setIsPaying(false);
        console.log(error);
    }

  }

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

        <Grid container className='fadeIn'>
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
                            <Box 
                                display="flex" 
                                justifyContent="center"
                                sx={{ display: isPaying ? 'flex' : 'none' }}
                            >
                                <CircularProgress />
                            </Box>

                            <Box 
                                flexDirection="column"
                                sx={{ display: !isPaying ? 'flex' : 'none', flex: 1 }}
                            >
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
                                        <PayPalButtons 
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: order.total.toString(),
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions!.order!.capture().then((details) => {
                                                    onOrderCompleted(details);
                                                    // const name = details!.payer!.name!.given_name;
                                                    // alert(`Transaction completed by ${name}`);
                                                });
                                            }}
                                        />
                                    )
                                }
                            </Box>

                            
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

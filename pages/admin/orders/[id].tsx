import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { OrderSummary } from '../../../components/cart';
import { CartList } from '../../../components/cart/CartList';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';

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

  const { shippingAddress } = order;

  return (
    <AdminLayout
        title={`Resumen de la Orden`}
        subtitle={`Resumen de la Orden #${order._id}`}
        icon={<AirplaneTicketOutlined />}
    >
        <Divider />

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
                            <Box flexDirection="column" display="flex">
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
                            </Box>

                            
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const { id = '' } = query;

    const order = await dbOrders.getOrderById(id.toString());

    if(!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
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

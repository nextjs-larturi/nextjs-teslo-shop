import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Chip, Grid, Typography, Link, Button } from '@mui/material';
import {
   DataGrid,
   GridColDef,
   GridRenderCellParams,
   GridToolbar,
} from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { tesloApi } from '../../axiosApi';

interface Props {
   orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
   // console.log(orders)

   const router = useRouter();

   const rows: any = [];

   orders.forEach((order, index) => {
      rows.push({
         id: index + 1,
         orderId: order._id,
         paid: order.isPaid,
         fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      });
   });

   const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'fullName', headerName: 'Nombre y Apellido', width: 300 },
      {
         field: 'paid',
         headerName: 'Pago realizado',
         description:
            'Puede demorar hasta 24 horas en acreditarse el pago realizado',
         width: 160,
         renderCell: (params: GridRenderCellParams) => {
            return params.row.paid ? (
               <Chip
                  color='success'
                  label='Pago realizado'
                  variant='outlined'
               />
            ) : (
               <Chip color='error' label='Pago pendiente' variant='outlined' />
            );
         },
      },
      {
         field: 'orden',
         headerName: 'Ver Orden',
         width: 300,
         sortable: false,
         renderCell: (params: GridRenderCellParams) => {
            return (
               <NextLink href={`/orders/${params.row.orderId}`} passHref>
                  <Link underline='always'>Ver Orden</Link>
               </NextLink>
            );
         },
      },
      {
         field: 'delete',
         headerName: 'Acciones',
         width: 100,
         renderCell: ({ row }: GridRenderCellParams) => {
            return !row.paid ? (
               <Button
                  value={row.role}
                  sx={{ width: 300 }}
                  onClick={() => handleOnDelete(row.orderId)}
               >
                  Eliminar
               </Button>
            ) : (
               <></>
            );
         },
      },
   ];

   const handleOnDelete = async (orderId: string) => {
      await tesloApi.delete(`/orders/${orderId}`, {
         method: 'DELETE',
      });
      router.reload();
   };

   return (
      <ShopLayout
         title='Historial de Ordenes'
         pageDescription='Historial de Ordenes'
      >
         <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
            Historial de Ordenes
         </Typography>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  components={{ Toolbar: GridToolbar }}
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  hideFooterSelectedRowCount={true}
                  disableSelectionOnClick={true}
               />
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session: any = await getSession({ req });

   if (!session) {
      return {
         redirect: {
            destination: '/auth/login?p=/orders/history',
            permanent: false,
         },
      };
   }

   const orders = await dbOrders.getOrdersByUser(session.user._id);

   return {
      props: {
         id: session.user._id,
         orders,
      },
   };
};

export default HistoryPage;

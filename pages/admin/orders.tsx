import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import React from 'react';
import { AdminLayout } from '../../components/layouts';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IUser } from '../../interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order Id', width: 220 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'total', headerName: 'Monto Total', width: 100 },
    { 
        field: 'isPaid', 
        headerName: 'Pagada', 
        width: 130,
        renderCell: ({row}: GridValueGetterParams) => {
            return row.isPaid 
                ? <Chip variant='outlined' label='Pagada' color='success' />
                : <Chip variant='outlined' label='Pendiente' color='error' />
        }
    },
    { field: 'noProducts', headerName: 'No. Products', align: 'center' },
    { 
        field: 'check', 
        headerName: 'Ver Orden', 
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
                    Ver Orden
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Fecha', width: 300 },
];

const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if(!data && !error) return <></>;

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }))

  return (
    <AdminLayout
        title='Ordenes'
        subtitle='Administración de Ordenes'
        icon={<ConfirmationNumberOutlined />}
    >
        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>

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
    </AdminLayout>
  )
}

export default OrdersPage
import React from 'react';
import NextLink from 'next/link';
import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre y Apellido', width: 300 },
    {
        field: 'paid', 
        headerName: 'Pago realizado',
        description: 'Puede demorar hasta 24 horas en acreditarse el pago realizado',
        width: 160,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid ?
                <Chip color='success' label='Pago realizado' variant='outlined' /> :
                <Chip color='error' label='Pago pendiente' variant='outlined' /> 
            )
        }
    },
    { 
        field: 'orden', 
        headerName: 'Ver Orden', 
        width: 300,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                       Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullName: 'Brian Romero' },
    { id: 2, paid: false, fullName: 'Juan Peruvian' },
    { id: 3, paid: true, fullName: 'Maria Per' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Historial de Ordenes'>
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>Historial de Ordenes</Typography>

        <Grid container>
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
    </ShopLayout>
  )
}

export default HistoryPage;
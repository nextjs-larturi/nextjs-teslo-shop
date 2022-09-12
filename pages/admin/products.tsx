import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Chip, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces';
import { format } from '../../utils/currency';

const columns: GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto', 
        width: 100 ,
        renderCell: ({row}: GridRenderCellParams) => {
           return (
            <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
                <CardMedia 
                    component='img'
                    className='fadeIn'
                    alt={row.title}
                    image={row.img}
                />
            </a>
           )
        }
    },
    { 
        field: 'title', 
        headerName: 'Producto', 
        width: 350,
        renderCell: ({row}: GridRenderCellParams) => {
            return (
               <NextLink href={`/admin/products/${row.slug}`} passHref>
                 <Link underline='always'>
                   { row.title }
                 </Link>
               </NextLink>
            )
         }
    },
    { 
        field: 'gender', 
        headerName: 'Genero', 
        width: 130,
        renderCell: ({row}: GridRenderCellParams) => {
            if(row.gender[0] === 'kid') return (<Chip variant='outlined' label='Kid' color='success' />);
            if(row.gender[0] === 'unisex') return (<Chip variant='outlined' label='Unisex' color='error' />);
            if(row.gender[0] === 'women') return (<Chip variant='outlined' label='Women' color='warning' />);
            if(row.gender[0] === 'men') return (<Chip variant='outlined' label='Men' color='primary' />);

        }
    },
    { field: 'type', headerName: 'Tipo', width: 100 },
    { field: 'inStock', headerName: 'Stock', width: 100 },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'sizes', headerName: 'Talles', width: 160 },
];

const ProductsPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if(!data && !error) return <></>;

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: format(product.price),
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }))

  return (
    <AdminLayout
        title={`Productos (${ data?.length })`}
        subtitle='Administración de Productos'
        icon={<CategoryOutlined />}
    >

        <Box display="flex" justifyContent="end" sx={{ marginBottom: 2 }}>
            <Button
                startIcon={<AddOutlined />}
                color="secondary"
                href="/admin/products/new"
            >
                Crear Producto
            </Button>
        </Box>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>

                <DataGrid 
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

export default ProductsPage
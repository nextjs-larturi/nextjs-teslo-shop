import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const HomeKidPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=kid');

  return (
    <ShopLayout title={'Teslo-Shop: Kids'} pageDescription={'Encuentra los productos que buscas en Teslo-Shop!'}>
      <Typography variant='h1' component='h1'>Kids</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }

      
    </ShopLayout>
  )
}

export default HomeKidPage
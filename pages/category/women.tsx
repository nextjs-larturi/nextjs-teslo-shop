import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const HomeWomenPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=women');

  return (
    <ShopLayout title={'Teslo-Shop: Women'} pageDescription={'Encuentra los productos que buscas en Teslo-Shop!'}>
      <Typography variant='h1' component='h1'>Women</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellas</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }

      
    </ShopLayout>
  )
}

export default HomeWomenPage
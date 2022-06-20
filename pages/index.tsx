import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop: Home'} pageDescription={'Encuentra los productos que buscas en Teslo-Shop!'}>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
    </ShopLayout>
  )
}

export default Home

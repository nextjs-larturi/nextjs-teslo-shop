import type { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { getProductsByTerms } from '../../database/dbProducts';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {

  return (
    <ShopLayout title={'Teslo-Shop: Search'} pageDescription={'Encuentra los productos que buscas en Teslo-Shop!'}>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC -- 123</Typography>
      <ProductList products={ products } />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string }

    if(query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await getProductsByTerms(query);

    return {
        props: {
            products
        }
    }
}

export default SearchPage;

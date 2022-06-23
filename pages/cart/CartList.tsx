import { Typography } from '@mui/material';
import { initialData } from '../../database/products';

const productsInCart = [
    initialData.products[0],
    initialData.products[2],
    initialData.products[5],
]

export const CartList = () => {
  return (
    <>
        {
            productsInCart.map((product) => (
                <Typography key={product.slug}>{product.title}</Typography>
            ))
        }
    </>
  )
}

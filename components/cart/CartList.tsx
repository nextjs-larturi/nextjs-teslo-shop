import { FC, useContext } from 'react';
import NextLink from 'next/link';
import {
   Box,
   Button,
   CardActionArea,
   CardMedia,
   Grid,
   Link,
   Typography,
} from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

interface Props {
   editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
   const { cart: productsInCart, updateCartQuantity } = useContext(CartContext);

   const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity(product);
   }

   return (
      <>
         {productsInCart.map((product) => (
            <Grid container spacing={2} key={product.slug + '-' + product.size} sx={{ mb: 1 }}>
               <Grid item xs={3}>
                  <NextLink href={`/product/${product.slug}`}>
                     <Link>
                        <CardActionArea>
                           <CardMedia
                              image={`/products/${product.image}`}
                              component='img'
                              sx={{ borderRadius: '5px' }}
                           />
                        </CardActionArea>
                     </Link>
                  </NextLink>
               </Grid>
               <Grid item xs={7}>
                  <Box display='flex' flexDirection='column'>
                     <Typography variant='body1'>{product.title}</Typography>
                     <Typography variant='body1'>
                        Talla: <strong>M</strong>
                     </Typography>

                     {editable ? (
                      <>
                        <div className='mt-4 mr-2'>
                           <ItemCounter
                              currentValue={product.quantity}
                              maxValue={10}
                              updatedQuantity={(value) => onNewCartQuantityValue(product, value)}
                           />
                        </div>

                        <div className='mt-4'>
                          <Button variant='text' color='secondary'>
                            Remover
                          </Button>
                        </div>
                      </>
                     ) : (
                        <Typography sx={{ mt: 3 }}>{product.quantity} {product.quantity > 1 ? 'Productos' : 'Producto'}</Typography>
                     )}
                  </Box>
               </Grid>
               <Grid
                  item
                  xs={2}
                  display='flex'
                  alignItems='left'
                  flexDirection='column'
               >
                  <Typography variant='subtitle1'>${product.price}</Typography>
               </Grid>
            </Grid>
         ))}
      </>
   );
};

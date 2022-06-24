import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

const productsInCart = [
    initialData.products[0],
    initialData.products[2],
    initialData.products[5],
]

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {


  return (
    <>
        {
            productsInCart.map((product) => (
                <Grid container spacing={2} key={product.slug} sx={{ mb:1 }}>
                  <Grid item xs={3}>
                    <NextLink href={'/product/slug'}>
                      <Link>
                        <CardActionArea>
                          <CardMedia 
                            image={`products/${product.images[0]}`}
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
                      <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                      {
                        editable ? 
                          <>
                            <div className='mt-4 mr-2'>
                              <ItemCounter />
                            </div>
                          
                            <div className='mt-4'>
                              <Button variant='text' color='secondary'>
                                Remover
                              </Button>
                            </div>
                          </> :
                          <Typography sx={{mt:3}}>3 items</Typography>
                      }

                    </Box>
                  </Grid>
                  <Grid item xs={2} display='flex' alignItems='left' flexDirection='column'>
                    <Typography variant='subtitle1'>${product.price}</Typography>
                    
                  </Grid>
                </Grid>
            ))
        }
    </>
  )
}

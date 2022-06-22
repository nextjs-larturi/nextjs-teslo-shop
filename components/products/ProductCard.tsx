import React, { FC } from 'react';
import { CardActionArea, CardMedia, Grid, Card } from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
   return (
      <Grid item xs={6} sm={4} xl={3} key={product.slug}>
         <Card>
            <CardActionArea>
               <CardMedia
                  component='img'
                  image={`products/${product.images[0]}`}
                  alt={product.title}
               ></CardMedia>
            </CardActionArea>
         </Card>
      </Grid>
   );
};

export default ProductCard;

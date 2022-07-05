import React, { useState, useContext } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct } from '../../interfaces';
import { dbProducts } from '../../database';
import { ISize } from '../../interfaces/products';
import { CartContext } from '../../context';

interface Props {
   product: IProduct;
}

export const ProductPage:NextPage<Props> = ({ product }) => {

   const router = useRouter();

   const { addProductToCart } = useContext(CartContext);  

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1,
   });

   const selectedSize = ( size: ISize ) => {
      setTempCartProduct( currentProduct => ({
         ...currentProduct,
         size
      }));
   }

   const onUpdateQuantity = ( quantity: number ) => {
      setTempCartProduct( currentProduct => ({
         ...currentProduct,
         quantity
      }));
   }

   const onAddProduct = () => {
      if(!tempCartProduct.size) return;

      // Llamar a la accion del context para agregar al carrito
      addProductToCart(tempCartProduct);

      router.push('/cart');
   }

   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlideshow 
                  images={product.images}
               />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Box display='flex' flexDirection='column'>
                  <Typography variant='h1' component='h1'>
                     {product.title}
                  </Typography>
                  <Typography variant='subtitle1' component='h2'>
                     ${product.price}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                     <Typography variant='subtitle2' sx={{ mb: 1 }}>Cantidad</Typography>
                     
                     <ItemCounter 
                        currentValue={tempCartProduct.quantity}
                        maxValue={product.inStock > 5 ? 5 : product.inStock}
                        updatedQuantity={ onUpdateQuantity }
                     />
                     
                     <Typography variant='subtitle2' sx={{ my: 2 }}>Talle</Typography>
                     <SizeSelector 
                        sizes={product.sizes} 
                        selectedSize={tempCartProduct.size}
                        onSelectedSize={ selectedSize }
                     />
                  </Box>

                  {/* Agregar al carrito */}
                  {
                     product.inStock > 0 ? (
                        <Button 
                           color='secondary' 
                           className='circular-btn'
                           onClick={ onAddProduct }
                        >
                           {
                              tempCartProduct.size
                              ? 'Agregar al carrito'
                              : 'Seleccione una talla'
                           }
                        </Button>
                     ) : (
                        <Chip label='No hay disponibles' color='error' variant='outlined' />
                     )
                  }
               
                  {/* Descripcion */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant='subtitle2'>Descripción</Typography>
                    <Typography variant='body2'>{product.description}</Typography>
                  </Box>

               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

// ESTA IMPLEMENACION HACE EL QUERY CADA VEZ QUE SE LLAMA LA PAGINA

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//    const { slug = '' } = params as { slug: string };
//    const product = await dbProducts.getProductBySlug(slug);

//    if(!product) {
//       return {
//          redirect: {
//             destination: '/',
//             permanent: false
//          }
//       }
//    }

//    return {
//       props: {
//          product
//       }
//    }
// }


// ESTA IMPLEMENTACION CON GetStaticPaths y GetStaticProps ES MAS EFICIENTE 
// SE HACE AL MOMENTO DE LA COMPILACION

// You should use GetStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

   const productSlugs = await dbProducts.getAllProductSlugs();

   return {
      paths: productSlugs.map( ({ slug }) => ({
         params: {
            slug
         }
      })),
      fallback: 'blocking'
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };

   const product = await dbProducts.getProductBySlug(slug);
 
      if(!product) { 
         return {
            redirect: {
               destination: '/',
               permanent: false
            }
         }
      }
   
      return {
         props: {
            product
         },
         revalidate: 86400, //60 * 60 * 24 (24 hours)
      }
}

export default ProductPage;





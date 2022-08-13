import React, { useContext} from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
   Button,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { jwt, countries } from '../../utils';
import { CartContext } from '../../context';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   zip: string;
   city: string;
   country: string;
   phone: string;
};

const getAddressFromCookies = (): FormData => {
    return {
       firstName: Cookies.get('firstName') || '',
       lastName: Cookies.get('lastName') || '',
       address: Cookies.get('address') || '',
       zip: Cookies.get('zip') || '',
       city: Cookies.get('city') || '',
       country: Cookies.get('country') || '',
       phone: Cookies.get('phone') || '',
    };
 };

export const AddressPage = () => {
   const router = useRouter();
   const { updateAddress } = useContext(CartContext);

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies() 
   });

   const onSubmitAddress = (data: FormData) => {
      updateAddress( data );
      router.push('/checkout/summary');
   };

   return (
      <ShopLayout
         title='Checkout: Revisar domicilio de destino'
         pageDescription='Direccion de destino'
      >
         <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
               Dirección
            </Typography>

            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Nombre'
                     variant='filled'
                     fullWidth
                     {...register('firstName', {
                        required: 'El nombre es requerido',
                     })}
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Apellido'
                     variant='filled'
                     fullWidth
                     {...register('lastName', {
                        required: 'El apellido es requerido',
                     })}
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Dirección'
                     variant='filled'
                     fullWidth
                     {...register('address', {
                        required: 'El domicilio es requerido',
                     })}
                     error={!!errors.address}
                     helperText={errors.address?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Código Postal'
                     variant='filled'
                     fullWidth
                     {...register('zip', {
                        required: 'El codigo postal es requerido',
                     })}
                     error={!!errors.zip}
                     helperText={errors.zip?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Ciudad'
                     variant='filled'
                     fullWidth
                     {...register('city', {
                        required: 'La ciudad es requerida',
                     })}
                     error={!!errors.city}
                     helperText={errors.city?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                     <TextField
                        select
                        variant='filled'
                        label='Pais'
                        defaultValue={Cookies.get('country') || countries[0].code}
                        {...register('country', {
                           required: 'El pais es requerido',
                        })}
                        error={!!errors.country}
                     >
                        {countries.map((country) => (
                           <MenuItem value={country.code} key={country.code}>
                              {country.name}
                           </MenuItem>
                        ))}
                     </TextField>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Teléfono'
                     variant='filled'
                     fullWidth
                     {...register('phone', {
                        required: 'El telefono es requerido',
                     })}
                     error={!!errors.phone}
                     helperText={errors.phone?.message}
                  />
               </Grid>
            </Grid>

            <Box
               sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <Button
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  type='submit'
               >
                  Revisar pedido
               </Button>
            </Box>
         </form>
      </ShopLayout>
   );
};

// Forma de verificar si esta autenticado sin middleware
// A partir de la v12 de Next nos ofrecen middlewares
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if(!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default AddressPage;

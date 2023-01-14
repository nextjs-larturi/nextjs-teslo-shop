import React, { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
   name: string;
   email: string;
   password: string;
};

const RegisterPage = () => {
   const router = useRouter();
   const { registerUser } = useContext(AuthContext);

   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [loginUrlParameter, setLoginUrlParameter] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const onRegisterForm = async ({ name, email, password }: FormData) => {
      setShowError(false);
      const { hasError, message } = await registerUser(name, email, password);

      if (hasError) {
         setShowError(true);
         setErrorMessage(message!);
         setTimeout(() => setShowError(false), 3000);
         return;
      }

      await signIn('credentials', { email, password });
   };

   return (
      <AuthLayout title='Registro'>
         <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography variant='h1' component='h1' textAlign='center'>
                        Registro
                     </Typography>
                     {/* <Chip
                        label={errorMessage}
                        color='error'
                        icon={<ErrorOutline />}
                        className='fadeIn'
                        sx={{
                           width: '100%',
                           marginTop: '10px',
                           display: showError ? 'flex' : 'none',
                        }}
                     /> */}
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        label='Nombre y Apellido'
                        variant='filled'
                        fullWidth
                        autoComplete='off'
                        {...register('name', {
                           required: 'El nombre es requerido',
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        label='Correo'
                        variant='filled'
                        fullWidth
                        {...register('email', {
                           required: 'El email es requerido',
                           validate: validations.isEmail,
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        label='Password'
                        type='password'
                        variant='filled'
                        fullWidth
                        {...register('password', {
                           required: 'El email es requerido',
                           minLength: {
                              value: 6,
                              message: 'Minimo 6 caracteres',
                           },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                        fullWidth
                     >
                        Crear Cuenta
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='end'>
                     <NextLink
                        href={
                           router.query.p
                              ? `/auth/login?p=${router.query.p}`
                              : '/auth/login'
                        }
                        passHref
                     >
                        <Link underline='always'>Iniciar Sesión</Link>
                     </NextLink>
                  </Grid>
               </Grid>
            </Box>
         </form>
      </AuthLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({
   req,
   query,
}) => {
   const session = await getSession({ req });

   const { p = '/' } = query;

   if (session) {
      return {
         redirect: {
            destination: p.toString(),
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

export default RegisterPage;

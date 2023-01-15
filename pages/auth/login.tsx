import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { signIn, getSession, getProviders } from 'next-auth/react';
import NextLink from 'next/link';
import {
   Box,
   Button,
   Divider,
   Grid,
   Link,
   TextField,
   Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '../../utils';
import { useRouter } from 'next/router';

import styles from './login.module.css';
import { AuthLayout } from '../../components/layouts/AuthLayout';

type FormData = {
   email: string;
   password: string;
};

const LoginPage = () => {
   const router = useRouter();
   const [showError, setShowError] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const [providers, setProviders] = useState<any>({});

   useEffect(() => {
      getProviders().then((providers) => {
         setProviders(providers);
      });
   }, []);

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);
      await signIn('credentials', { email, password });
   };

   return (
      <AuthLayout title='Login'>
         <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography variant='h1' component='h1' textAlign='center'>
                        Iniciar Sesión
                     </Typography>
                     {/* <Chip
                        label='Usuario y/o password incorrectos'
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
                        label='Correo'
                        variant='filled'
                        type='email'
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
                        Ingresar
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='end'>
                     <NextLink
                        href={
                           router.query.p
                              ? `/auth/register?p=${router.query.p}`
                              : '/auth/register'
                        }
                        passHref
                        legacyBehavior
                     >
                        <Link underline='always'>No tienes cuenta?</Link>
                     </NextLink>
                  </Grid>

                  <Grid
                     item
                     xs={12}
                     display='flex'
                     justifyContent='end'
                     flexDirection='column'
                  >
                     <Divider sx={{ width: '100%', mb: 2 }} />

                     {Object.values(providers).map((provider: any) => {
                        if (provider.id == 'credentials') return null;

                        let btnStyles = styles.githubBtn;

                        switch (provider.id) {
                           case 'github':
                              btnStyles = styles.githubBtn;
                              break;

                           case 'facebook':
                              btnStyles = styles.facebookBtn;
                              break;

                           case 'google':
                              btnStyles = styles.googleBtn;
                              break;
                        }

                        return (
                           <Button
                              key={provider.id}
                              variant='outlined'
                              fullWidth
                              color='primary'
                              sx={{ mb: 1, p: 1 }}
                              onClick={() => signIn(provider.id)}
                              className={`${btnStyles} ${styles.providerBtn}`}
                           >
                              {provider.name}
                           </Button>
                        );
                     })}
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

export default LoginPage;

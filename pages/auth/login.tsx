import React from 'react';
import NextLink from 'next/link'; 
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.log(data);
  } 

  return (
    <AuthLayout title='Login' >
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label="Correo" 
                            variant="filled" 
                            type="email"
                            fullWidth
                            { ...register('email', {
                                required: 'El email es requerido',
                                validate: validations.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label="Password" 
                            type='password' 
                            variant="filled" 
                            fullWidth
                            { ...register('password', {
                                required: 'El email es requerido',
                                minLength: {value: 6, message: 'Minimo 6 caracteres'}
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            type='submit'
                            color="secondary" 
                            className="circular-btn" 
                            size="large" 
                            fullWidth
                        >
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href="/auth/register" passHref>
                            <Link underline='always'>
                                No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage;
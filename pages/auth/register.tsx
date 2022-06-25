import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const RegisterPage = () => {
  return (
    <AuthLayout title='Registro' >
        <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Registro</Typography>
                </Grid>
               
                <Grid item xs={12}>
                    <TextField label="Nombre y Apellido" variant="filled" fullWidth autoComplete='off' />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Correo" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Password" type='password' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" fullWidth>
                        Crear Cuenta
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href="/auth/login" passHref>
                        <Link underline='always'>
                            Iniciar Sesión
                        </Link>
                    </NextLink>
                </Grid>

            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage;
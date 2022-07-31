import React, { useContext, useState } from 'react';
import NextLink from 'next/link'; 
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

  const router = useRouter();  
  const { login } = useContext(AuthContext);
  const [ showError, setShowError ] = useState(false);
  const [ registerUrlParameter, setRegisterUrlParameter ] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onLoginUser = async ( {email, password}: FormData) => {

    setShowError(false);

    const isValidLogin = await login(email, password);

    if(!isValidLogin) {
        setShowError(true);
        setTimeout(() => { setShowError(false) }, 3000);
        return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  } 

  return (
    <AuthLayout title='Login' >
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1' textAlign='center'>Iniciar Sesión</Typography>
                        <Chip
                            label='Usuario y/o password incorrectos'
                            color='error'
                            icon={<ErrorOutline />} 
                            className='fadeIn'
                            sx={{ width: '100%', marginTop: '10px', display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label='Correo' 
                            variant='filled' 
                            type='email'
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
                        <NextLink href={ router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register' } passHref>
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
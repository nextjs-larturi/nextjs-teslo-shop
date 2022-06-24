import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout';

export const AddressPage = () => {
  return (
    <ShopLayout  title='Direccion' pageDescription='Direccion de destino'>
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>Dirección</Typography>

        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Código Postal' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant='filled'
                        value={1}
                    
                    >
                        <MenuItem value={1}>Argentina</MenuItem>
                        <MenuItem value={2}>Brasil</MenuItem>
                        <MenuItem value={3}>Uruguay</MenuItem>
                        <MenuItem value={4}>Chile</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Teléfono' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Email' variant='filled' fullWidth />
            </Grid>

        </Grid>

        <Box sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Button color='secondary' className='circular-btn' size='large'>
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage;

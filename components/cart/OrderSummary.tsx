import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6} sx={{mt:1}}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>$3000</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography>Impuestos (10%)</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>$300</Typography>
        </Grid>


        <Grid item xs={12} sx={{mt:2, mb:2}}>
            <Divider />
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography variant='subtitle1'>Total a pagar</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>$3300</Typography>
        </Grid>
    </Grid>
  )
}

export default OrderSummary;
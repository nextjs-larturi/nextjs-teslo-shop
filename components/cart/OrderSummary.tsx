import React, { useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { currency} from '../../utils';

export const OrderSummary = () => {

  const { numberOfItems, subtotal, total, tax } = useContext(CartContext);

  return (
    <Grid container>
        <Grid item xs={6} sx={{mt:1}}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'items' : 'item' }</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>{currency.format(subtotal)}</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography>{currency.format(tax)}</Typography>
        </Grid>


        <Grid item xs={12} sx={{mt:2, mb:2}}>
            <Divider />
        </Grid>

        <Grid item xs={6} sx={{mt:1}}>
            <Typography variant='subtitle1'>Total a pagar</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:1}} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}

export default OrderSummary;
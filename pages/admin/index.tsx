import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { DashboardOutlined, CreditCardOffOutlined, AttachmentOutlined, AttachMoneyOutlined, GroupOutlined, CategoryOutlined, CancelPresentation, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30 seconds
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  if( !error && !data ) {
    return <></>
  }

  if(error) {
    console.error(error);
    return <Typography>Error al cargar la información</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout 
        title="Dashboard"
        subtitle="Estadisticas generales"
        icon={ <DashboardOutlined /> }
    >
        <Grid container spacing={2}>

          <SummaryTile 
            title={numberOfOrders}
            subtitle="Ordenes Totales"
            icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={paidOrders}
            subtitle="Ordenes Pagadas"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={notPaidOrders}
            subtitle="Ordenes Pendientes"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={numberOfClients}
            subtitle="Clientes"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={numberOfProducts}
            subtitle="Productos"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={productsWithNoInventory}
            subtitle="Sin Stock"
            icon={<CancelPresentation color="error" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={lowInventory}
            subtitle="Bajo inventario"
            icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={refreshIn}
            subtitle="Actualización en:"
            icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
          />

        </Grid>

        
    </AdminLayout>
  )
}

export default DashboardPage;


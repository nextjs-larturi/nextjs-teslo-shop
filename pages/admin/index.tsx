import React from 'react';
import { DashboardOutlined, CreditCardOffOutlined, AttachmentOutlined, AttachMoneyOutlined, GroupOutlined, CategoryOutlined, CancelPresentation, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';

const DashboardPage = () => {
  return (
    <AdminLayout 
        title="Dashboard"
        subtitle="Estadisticas generales"
        icon={ <DashboardOutlined /> }
    >
        <Grid container spacing={2}>

          <SummaryTile 
            title={1}
            subtitle="Ordenes Totales"
            icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={2}
            subtitle="Ordenes Pagadas"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={3}
            subtitle="Ordenes Pendientes"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={4}
            subtitle="Clientes"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={5}
            subtitle="Productos"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={6}
            subtitle="Sin Stock"
            icon={<CancelPresentation color="error" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={7}
            subtitle="Bajo inventario"
            icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
            title={8}
            subtitle="Actualización en:"
            icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
          />

        </Grid>

        
    </AdminLayout>
  )
}

export default DashboardPage;
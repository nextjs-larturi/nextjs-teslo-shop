import { DashboardOutlined } from '@mui/icons-material';
import React from 'react';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
  return (
    <AdminLayout 
        title="Dashboard"
        subtitle="Estadisticas generales"
        icon={ <DashboardOutlined /> }
    >
        <h4>Hola mundo</h4>
    </AdminLayout>
  )
}

export default DashboardPage;
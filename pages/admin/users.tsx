import React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';

import { PeopleOutline } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';
import { Grid } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';

const UsersPage = () => {

  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  if(!data && !error) return <></>;

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    { field: 'role', headerName: 'Rol', width: 300 },
  ];

  const rows = data!.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }));

  return (
    <AdminLayout
        title='Usuarios'
        subtitle='Administración de Usuarios'
        icon={<PeopleOutline />}
    >
        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>

                <DataGrid 
                    components={{ Toolbar: GridToolbar }}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    hideFooterSelectedRowCount={true}
                    disableSelectionOnClick={true}
                />

            </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default UsersPage;
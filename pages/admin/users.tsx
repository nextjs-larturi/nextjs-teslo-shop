import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';

import { PeopleOutline } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

const UsersPage = () => {

  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
   if(data) {
    setUsers(data);
   }
  }, [data])
  

  if(!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {

    const previousUsers = users.map(user => ({ ...user }));

    const updatedUsers = users.map(user => ({
        ...user,
        role: user._id === userId ? newRole : user.role
    }));

    setUsers(updatedUsers);

    try {
        await tesloApi.put('/admin/users', {userId, role: newRole});
    } catch (error) {
        alert('No se pudo actualizar');
        setUsers(previousUsers);
        console.log(error);
    }

  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    { 
        field: 'role', 
        headerName: 'Rol', 
        width: 300,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <Select
                    value={row.role}
                    label="Rol"
                    sx={{ width: 300 }}
                    onChange={({ target }) => onRoleUpdated(row.id, target.value)}
                >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="client">Cliente</MenuItem>
                    <MenuItem value="superuser">Superuser</MenuItem>
                    <MenuItem value="seo">Seo</MenuItem>
                </Select>
            )
        }
    },
  ];

  const rows = users!.map(user => ({
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
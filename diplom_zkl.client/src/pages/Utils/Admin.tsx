/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { User } from "../../models/user";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from "@mui/material";

const Admin = () => {
    const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей

       //загрузить таблицу юзеров
    useEffect(() => {
        UserService.getAllUsers().then(result => {
            setallUsers(result.data);
                console.log(result.data);
        });
    }, []);
   
 
    const columns: GridColDef[] = [
        {
          field: 'name',
          headerName: 'Имя',
          width: 150,
          editable: true,
        },
        {
          field: 'surname',
          headerName: 'Фамилия',
          width: 150,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'string',
          width: 110,
          editable: true,
        },
        {
            field: 'telegramlogin',
            headerName: 'Telegram',
            type: 'string',
            width: 110,
            editable: false,
          },
          {
            field: 'role',
            headerName: 'Права',
            type: 'number',
            width: 100,
            editable: true,
          },
      ];
      
    return (
        <>
        <h1>Панель администратора</h1>
        <Box sx={{ height: 400, width: '80%', marginTop: '30px', marginLeft: '50px' }}>
        <DataGrid
          rows={allUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      </>

    )
}

export default Admin

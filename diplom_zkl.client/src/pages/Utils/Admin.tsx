/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { User, NewUser } from "../../models/user";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import userService from "../../services/user.service";
import { Label } from "@mui/icons-material";
import Divider from '@mui/joy/Divider';
import DialogActions from '@mui/joy/DialogActions';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const Admin = () => {
    const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей
    const [selectedUser, setSelectedUser] = useState<string[]>([]);

       //загрузить таблицу юзеров
    useEffect(() => {
        UserService.getAllUsers().then(result => {
            setallUsers(result.data);
                console.log(result.data);
        });
    }, []);

    function deleteUser() {
      const guid: String = selectedUser[0];
      UserService.deleteUser(guid).then(result => {
           if (result.status === 200) 
           {
            setallUsers(allUsers.filter(user => user.id!== selectedUser[0]));
           }
        });    
    }

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
        <h3>Панель администратора</h3>
        <Box sx={{ height: 400, width: '80%', marginTop: '30px', marginLeft: '50px' }}>
        <DataGrid
          onRowSelectionModelChange={(rowSelectionModel)=>{
            console.log(rowSelectionModel);
            setSelectedUser(rowSelectionModel as string[]);
          }}
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
      <Box sx={{ height: 100, width: '80%', marginTop: '30px', marginLeft: '50px' }}>
      <NewUserModal />
      <Button disabled={!(selectedUser.length>0)} size="md" variant="solid" color="danger" sx={{marginLeft: '5px'}} startDecorator={<Remove />} onClick={deleteUser}> 
      Удалить пользователя</Button>
      </Box>
     

      </>

    )
}
export default Admin


//компонент создания пользователя
 function NewUserModal () {
  const [newuser, setnewUser] = useState<NewUser>(); //текущий пользователь
  const { handleSubmit, control } = useForm<NewUser>();
  const [open, setOpen] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<NewUser> = (data) => 
  {
    data.pictureUrl = '';
    console.log(data);
    userService.createUser(data as NewUser).then((result) => 
    {
      if (result.status.toFixed(0) === "200") 
      {
        setOpen(false);
      }}).catch((error) => {
        console.log(error);
      });
   
    };

  return (
    <React.Fragment>
      <Button
        size="md" variant="solid" color="primary"
        sx={{margin: '5px', marginTop: '10px'}}
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Новый пользователь
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Создать нового пользователя</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
            <FormControl >

            <Controller
                    name="login"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Логин" value={newuser?.login} />} />

            <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Пароль" value={newuser?.password} />} />

                   <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Имя" value={newuser?.name} />} />

                     <Controller
                      name="surname"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Фамилия" sx={{ flexGrow: 1 }} value={newuser?.surname} />} />

                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Email" sx={{ flexGrow: 1 }} value={newuser?.email} />} />

<Controller
                      name="telegramlogin"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Telegram" sx={{ flexGrow: 1 }} value={newuser?.telegramlogin} />} />

                  <Label>Администратор</Label>
                    <Controller
                      name="IsAdmin"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} type="checkbox" value={newuser?.IsAdmin} />} />



              </FormControl>
              <Button type="submit">Создать</Button>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>Отмена</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

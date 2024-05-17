/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { User, NewUser } from "../../models/user";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
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
import Divider from '@mui/joy/Divider';
import { Checkbox } from "@mui/joy";

const Admin = () => {
    const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей
    const [selectedUser, setSelectedUser] = useState<string[]>([]);

       //загрузить таблицу юзеров
    useEffect(() => {
        userService.getAllUsers().then(result => {
            setallUsers(result.data);
                console.log(result.data);
        });
    }, []);

    function deleteUser() {
      const guid: string = selectedUser[0];
      userService.deleteUser(guid).then(result => {
           if (result.status === 200) 
           {
            setallUsers(allUsers.filter(user => user.id!== selectedUser[0]));
           }
        });    
    }

    const columns: GridColDef[] = [
      {
        field: 'login',
        headerName: 'Логин',
        width: 150,
        editable: false,
      },
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
          {
            field: 'isAdmin',
            headerName: 'Администратор',
            type: 'boolean',
            width: 150,
            editable: true,
          },
      ];
      
    return (
        <>
        <h3>Панель администратора</h3>
        <Divider></Divider>
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
  const { handleSubmit, control } = useForm<NewUser>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [newuser, setnewuser] = React.useState<NewUser>();

  //записать свойство в объект юзера
  const onChangeHandler = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    const tempUser: NewUser = { ...newuser, [name]: value } as NewUser;
    setnewuser(tempUser);
    console.log(tempUser);

}

  const onSubmit: SubmitHandler<NewUser> = (data:NewUser|undefined) => 
  {
    if (!data) return;
    data.pictureUrl = '';
    userService.createUser(data as NewUser).then((result) => 
    {
      if (result.status.toFixed(0) === "200") 
      {
        setOpen(false);
      }}).catch((error) => {
        console.log(error);
      });
   window.location.reload();
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
          <DialogContent>Внимателно заполните все необходимые поля.</DialogContent>
        
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
            <FormControl >
            <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
            <Controller
                    name="login"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Логин" value={newuser?.login} required={true} onChange={onChangeHandler}/>} />

            <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Пароль" value={newuser?.password} required={true} onChange={onChangeHandler} />} />

                   <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                     <Input {...field} size="sm" placeholder="Имя" value={newuser?.name} required={true} onChange={onChangeHandler}/>} />

                     <Controller
                      name="surname"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Фамилия" sx={{ flexGrow: 1 }} value={newuser?.surname} required={true} onChange={onChangeHandler}/>} />

                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Email" sx={{ flexGrow: 1 }} value={newuser?.email} required={true} onChange={onChangeHandler}/>} />

<Controller
                      name="telegramlogin"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Input {...field} size="sm" placeholder="Telegram" sx={{ flexGrow: 1 }} value={newuser?.telegramlogin} required={false} onChange={onChangeHandler}/>} />

                
                    <Controller
                      name="IsAdmin"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                      <Checkbox label="Администратор" {...field} value={newuser?.IsAdmin} onChange={onChangeHandler}/>} />
                          </Box>
              </FormControl>
          
              <Button onClick={()=>{ 
                if (newuser != undefined)onSubmit(newuser)
                }}>Создать</Button>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>Отмена</Button>
            </Stack>
          </form>
         
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import HeaderTop from '../components/HeaderTop';
import { TaskItemModel } from '../models/taskitem';
import TaskItemsService from '../services/taskitemsservice';
import { Avatar, Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, ListDivider, ListItemDecorator, Stack, Textarea, Typography } from '@mui/joy';
import { Controller, useForm } from 'react-hook-form';
import Select, { SelectOption } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { usersInProject } from '../models/user';
import Snackbar from '@mui/joy/Snackbar';
import React from 'react';
import Endpoints from '../services/endpoints';
import userService from '../services/user.service';

function Task() {
  const params = useParams();
  const prodId = params.id;
  const [Task, setTask] = useState<TaskItemModel>();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); //всплывашка хорошая
  const [openSnackbarBad, setOpenSnackbarBad] = useState(false); //всплывашка справа
  const [UsersInProject, setUsersInProject] = useState<usersInProject[]>([]);  


  const { control } = useForm<TaskItemModel>(
    {
        defaultValues: Task
    }
);

function renderValue(option: SelectOption<string> | null) {
    if (!option) {
      return null;
    }
    return (
      <React.Fragment>
        <ListItemDecorator>
          <Avatar size="sm" src={`${Endpoints.API_URL}` + `${UsersInProject.find((o) => o.id === option.value)?.pictureUrl}`} />
        </ListItemDecorator>
        {option.label}
      </React.Fragment>
    );
  }
  /*
    const onChangeStatement = (e: { target: { name: string; value: string; }; }) => {
      const text: string = e.target.value;
      if (text != 'undefined')
      {
      let status: number = 0;
      if (text== 'Не начато') {status=1}
      if (text== 'В работе') {status=2}
      if (text== 'На проверке') {status=3}
      if (text== 'Завершено') {status=4}
        const MyTask: TaskItemModel = { ...Task, statement: status } as TaskItemModel;
        setTask(MyTask);
    }
  }
  */
  const onChangeHandlerDate = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    const MyTask: TaskItemModel = { ...Task, [name]: value } as TaskItemModel;
    setTask(MyTask);
    console.log(MyTask);
  }

  useEffect(() => {
    userService.getAllUsers().then((result: { data: React.SetStateAction<usersInProject[]>; }) => {
      setUsersInProject(result.data);
      TaskItemsService.getTask(prodId).then((res) => {
        setTask(res.data);
      });
    });
}, []);


  function Save()
  {
    console.log(Task);
    TaskItemsService.saveTask(Task).then((res) => {
      if (res.status === 200) {
        setOpenSnackbar(true)}
      
      else {
        setOpenSnackbarBad(true)}
      }
    );}


  function deleteTask()
  {
    TaskItemsService.deleteTask(prodId).then((res) => {
        if(res.status === 204)
            {
              navigate('/tasklist', { replace: true });
            }
    });
  }

  return (
    <>
    <HeaderTop Header="Редактирование задачи" />
    <Box sx={{ flex: 1, width: '70%' }}>
                        <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="title-md">{` ${Task?.title}`}</Typography>
                                    <Typography level="body-sm">
                                    {` ${Task?.description}`}
                                    </Typography>
                                </Box>
                                <Divider />

                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                                >
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <FormLabel>Название</FormLabel>
                                            <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) =>
                                                    <Input {...field} size="sm" placeholder="Название" value={Task?.title} onChange={onChangeHandlerDate}/>} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Описание</FormLabel>                              
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) =>
                                                   <Textarea {...field} size="sm" placeholder="Описание" sx={{ mb: 1 }} value={Task?.description} onChange={onChangeHandlerDate}/>} />
                                                   </FormControl>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                        <FormControl >

                                        <FormLabel>Старт</FormLabel>
                                        <Controller
                                        name="start"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                        <Input {...field} type='date' size="sm" placeholder="Начало" value={Task?.start?.toString()} required={false} defaultValue={Date.now()} onChange={onChangeHandlerDate}/>} />
                                        </FormControl>

                                        <FormControl >
                                        <FormLabel>Финиш</FormLabel>
                                        <Controller
                                        name="end"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                        <Input {...field} type='date' size="sm" placeholder="Конец" value={Task?.end?.toString()} required={false} defaultValue={Date.now()} onChange={onChangeHandlerDate}/>} />
                                        </FormControl>
                                            </Stack>
                                           
                                            <FormControl>
                                                <FormLabel>Состояние</FormLabel>
                                                <Controller
                                        name="statement"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <Select {...field} value={Task?.statement.toString()} size="sm" placeholder="Состояние"
                                            //                                                onChange={onChangeStatement} 
                                            >          
                                                <Option value="1">Не начато</Option>
                                                <Option value="2">В работе</Option>
                                                <Option value="3">На проверке</Option>
                                                <Option value="4">Завершено</Option>
                                                </Select>} />
                                            </FormControl>

                                            <FormControl sx={{ flexGrow: 1 }}>
                                                <FormLabel>Ответственный</FormLabel>
                                                <Select
                      slotProps={{
                        listbox: {
                          sx: {
                            '--ListItemDecorator-size': '44px',
                          },
                        },
                      }}
                      sx={{
                        '--ListItemDecorator-size': '44px',
                        minWidth: 240,
                      }}
                      renderValue={renderValue}
                    >
                      
                      {UsersInProject.map((option, index) => (
                        <React.Fragment key={option.id}>
                          {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                          <Option value={option.id} label={option.name}>
                            <ListItemDecorator>
                              <Avatar size="sm" src={`${Endpoints.API_URL}`+`${option.pictureUrl}`} />
                            </ListItemDecorator>
                            {option.name + ' ' + option.surname}
                          </Option>
                        </React.Fragment>
                      ))}
                   
                    </Select>
                                            </FormControl>
                                        </Stack>
                                        </Stack>
                              

                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate('/tasklist')}>                                            Отмена
                                        </Button>
                                        <Button size="sm" variant="solid" type="submit" onClick={Save}>
                                            Сохранить
                                        </Button>
                                        <Button size="sm" variant="solid" color="danger" sx={{marginLeft: '5px'}} onClick={deleteTask}> Удалить Задачу</Button>
                                    </CardActions>
                                </CardOverflow>
                        </Card>
                        </Box>


                        <Snackbar
                    variant="soft"
                    color="success"
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}>
                    Изменения сохранены
                </Snackbar>

                <Snackbar
                    variant="soft"
                    color="danger"
                    open={openSnackbarBad}
                    onClose={() => setOpenSnackbarBad(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}>
                    Что-то пошло не так
                </Snackbar>
    </>
  );
}

export default Task;
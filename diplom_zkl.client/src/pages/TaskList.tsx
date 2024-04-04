import { Avatar, Badge, Box, Button, Chip, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Link, List, ListItem, ListItemContent, ListItemDecorator, Modal, ModalDialog, Select, SelectOption, Sheet, Textarea, Typography, styled } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import React, { SetStateAction, useEffect, useState } from 'react';
import { NewTask, TaskItemModel } from '../models/taskitem';
import TaskItemsService from '../services/taskitemsservice';
import TaskItemCard from '../components/TaskItemCard';
import { Paper } from '@mui/material';
import TaskTime from '../components/Tasktime';
import HeaderTop from '../components/HeaderTop';
import Add from '@mui/icons-material/Add';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Label } from '@mui/icons-material';
import { User, usersInProject } from "../models/user";
import Option from '@mui/joy/Option';
import ListDivider from '@mui/joy/ListDivider';
import userService from "../services/user.service";
import Endpoints from "../services/endpoints";
import { Route } from 'react-router';

function TaskList() {
const [TaskList, setTaskList] = useState<TaskItemModel[]>([]);

useEffect(() => {
  TaskItemsService.getAllTasks().then((res: { data: SetStateAction<TaskItemModel[]>; }) => {
    setTaskList(res.data);
    console.log(res.data);
  });
}, []);

  return (
    <>
    <HeaderTop Header="Задачи"/>
   
   
    <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {TaskList.length==0? <Typography level="body-sm">Здесь пока нет никаких задач...</Typography> : 
            TaskList.map((item:TaskItemModel, index: number) => 
            (
              <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{
                  margin: '15px',
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              > 
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <div>
                 
                    <Typography level="title-md">{item.title}  <TaskBadge status={item.statement} /></Typography>
                  
                    <Divider component="div" sx={{ my: 1 }} />
                    <Typography level="body-xs">{item.description}</Typography>
                    <Divider component="div" sx={{ my: 1 }} />
                    <TaskTime start={item.start} end={item.end}/>
                    <Divider component="div" sx={{ my: 1 }} />
                    <Link href={"/Task/"+`${item.id}`} level="body-sm">Редактировать</Link>
                  </div>
                </Box>
               
              </Sheet>
            ))}
          </List>
          <CreateNewTask/>
          
   </>
  );
}

export default TaskList;

function CreateNewTask () {
  const [open, setOpen] = React.useState<boolean>(false);
  const { handleSubmit, control } = useForm<NewTask>();
  const [UsersInProject, setUsersInProject] = useState<usersInProject[]>([]);  
  let NewTask:NewTask;

  //загрузить таблицу юзеров
  useEffect(() => {
    userService.getAllUsers().then((result: { data: React.SetStateAction<usersInProject[]>; }) => {
      setUsersInProject(result.data);
      console.log(result.data);
    });
}, []);


 //сохранить изменения
 function Save() {
  console.log(NewTask);
  TaskItemsService.createTask(NewTask as NewTask).then((result) => 
  {
    if (result.status.toFixed(0) === "200") 
    {
      setOpen(false);
    }}).catch((error) => {
      console.log(error);
    });
  };


  const onSubmit: SubmitHandler<NewTask> = (data) => 
  {
    console.log(data);
    TaskItemsService.createTask(data as NewTask).then((result) => 
    {
      if (result.status.toFixed(0) === "200") 
      {
        setOpen(false);
      }}).catch((error) => {
        console.log(error);
      });
    };


    
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


  return (
    <React.Fragment>
 <Button
        size="sm" variant="soft" color="primary"
        sx={{margin: '5px', marginTop: '10px'}}
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Новая задача
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Ура! Новая задача</DialogTitle>

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
                    name="title"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                    <Input {...field} size="sm" placeholder="Название" value={NewTask?.title} required={true}/>} />
                    
                    <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                    <Textarea  {...field} size="sm" minRows={2} placeholder="Описание" value={NewTask?.description} required={true}/>} />

                    <FormControl >
                    <FormLabel>Старт</FormLabel>
                    <Controller
                    name="start"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                    <Input {...field} type='date' size="sm" placeholder="Начало" value={NewTask?.start} required={false} defaultValue={Date.now()} />} />
                    </FormControl>

                    <FormControl >
                    <FormLabel>Финиш</FormLabel>
                    <Controller
                    name="end"
                    control={control}
                    rules={{ required: true }}
                     render={({ field }) =>
                    <Input {...field} type='date' size="sm" placeholder="Конец" value={NewTask?.end} required={false}/>} />
                    </FormControl>

                    <FormControl >
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


                </Box>
              </FormControl>
              </Stack>
        
          <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
            <Button
            onClick = {() => Save()}
            type="submit"
                variant="soft"
                color="primary">
                Сохранить
              </Button>
            <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(false)}>
                Отмена
              </Button>
             
          </Stack>
           </form>
          </ModalDialog>
          </Modal>
    </React.Fragment>)
}

type PropTypes = {
  status: number
};


const TaskBadge: React.FC<PropTypes> = ({status}) => {
    if(status == 1)
    {
      return ( <Chip color="neutral"  size="sm" disabled>Не начато</Chip> );
    }
    if (status == 2) { 
      return ( <Chip color="success" size="sm" >В работе</Chip> );
    }
    if (status == 3) { 
      return ( <Chip color="danger" size="sm" >На проверке</Chip> );
    }
    if (status == 4) { 
      return ( <Chip color="warning" size="sm" >Выполнено</Chip> );
    }
    else
    {
      return (<></>)
    }
}

import { Avatar, Badge, Box, Button, Chip, Divider, List, ListItem, ListItemContent, ListItemDecorator, Sheet, Typography, styled } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import React, { SetStateAction, useEffect, useState } from 'react';
import { TaskItemModel } from '../models/taskitem';
import TaskItemsService from '../services/taskitemsservice';
import TaskItemCard from '../components/TaskItemCard';
import { Paper } from '@mui/material';
import TaskTime from '../components/Tasktime';
import HeaderTop from '../components/HeaderTop';
import Add from '@mui/icons-material/Add';


function TaskList() {
const [TaskList, setTaskList] = useState<TaskItemModel[]>([]);
const [open, setOpen] = React.useState<boolean>(false);

useEffect(() => {
  TaskItemsService.getAllTasks().then((res: { data: SetStateAction<TaskItemModel[]>; }) => {
    setTaskList(res.data);
    console.log(res.data);
  });
}, []);

  return (
    <>
    <HeaderTop Header="Задачи"/>
    <Button
        size="sm" variant="soft" color="primary"
        sx={{margin: '5px', marginTop: '10px'}}
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Новая задача
      </Button>
   
    <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {TaskList.map((item:TaskItemModel, index: number) => 
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
                  <Badge badgeContent={4} size="sm" badgeInset="-10%" anchorOrigin={{    vertical: 'top',    horizontal: 'right',  }} color={item.statement!=2? 'primary' : 'danger'}>
                    <Typography level="title-md">{item.title}</Typography>
                    </Badge>
                    <Divider component="div" sx={{ my: 1 }} />
                    <Typography level="body-xs">{item.description}</Typography>
                    <Divider component="div" sx={{ my: 1 }} />
                    <TaskTime start={item.start} end={item.end}/>
                  </div>
                </Box>
                
              </Sheet>
            ))}
          </List>


   </>
  );
}

export default TaskList;
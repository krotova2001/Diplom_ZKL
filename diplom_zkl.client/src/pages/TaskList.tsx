import { Avatar, Box, Chip, Divider, List, ListItem, ListItemContent, ListItemDecorator, Sheet, Typography, styled } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import React, { SetStateAction, useEffect, useState } from 'react';
import { TaskItemModel } from '../models/taskitem';
import TaskItemsService from '../services/taskitemsservice';
import TaskItemCard from '../components/TaskItemCard';
import { Paper } from '@mui/material';


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
    <Typography sx={{
      marginLeft: '45 px',
      marginTop: '10px',
      padding: '5px',
      

    }} 
    level="h3">Мои задачи</Typography>
    <Divider/>
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
                    <Typography level="title-md">{item.title}</Typography>
                    <Typography level="body-xs">{item.description}</Typography>
                  </div>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
              </Sheet>
            ))}
          </List>


   </>
  );
}

export default TaskList;
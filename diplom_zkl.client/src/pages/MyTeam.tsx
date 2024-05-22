/* eslint-disable @typescript-eslint/no-explicit-any */
import HeaderTop from '../components/HeaderTop';
import userService from "../services/user.service";
import { useEffect, useState } from 'react';
import { User } from '../models/user';
import { TaskItemModel } from '../models/taskitem';
import { Avatar, Box, Divider, List, ListItem, ListItemContent, ListItemDecorator, Sheet, Typography } from '@mui/joy';
import { GuidGenerator } from './Utils/GuidGenerator';
import Endpoints from '../services/endpoints';
import image from "../assets/project_icon.png";
import { Link } from 'react-router-dom';

function MyTeam() {
  const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей

//загрузить таблицу юзеров
useEffect(() => {
  userService.getAllUsers().then(result => {
      

      let newUsers: User[] = result.data;
      newUsers.forEach(user => {
        user.Projects = [];
        user.Projects.push(
          {
          id: GuidGenerator.generate(),
          title: "Project 1",
          description: "Description 1",
          taskitemNavigation: [],
          userNavigation: []
        },
        {
          id: GuidGenerator.generate(),
          title: "Project 2",
          description: "Description 2",
          taskitemNavigation: [],
          userNavigation: []
        }
      );
      });
      
      console.log(newUsers);
      setallUsers(newUsers);
  });
}, []);


  return (
    <>
    
    <HeaderTop Header='Моя команда' />
    <List
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 2,
      }}
    >
      {allUsers.map((person, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: 'sm',
            p: 2,
            listStyle: 'none',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar
              variant="outlined"
              src={Endpoints.API_URL+person.pictureUrl}
              srcSet={`${Endpoints.API_URL+person.pictureUrl} 2x`}
              sx={{ borderRadius: '50%' }} />
            <div>
              <Typography level="title-md">{person.name}</Typography>
              <Typography level="body-xs">telegram - @<Link to={`tg://resolve?domain=${person.telegramlogin}`}>{person.telegramlogin}</Link></Typography>
            </div>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          
          <List sx={{ '--ListItemDecorator-size': '40px', gap: 2 }}>
            {person.Projects.map((project, companyIndex) => (
              <ListItem key={companyIndex} sx={{ alignItems: 'flex-start' }}>
                <ListItemDecorator
                  sx={{
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      height: '100%',
                      width: '1px',
                      bgcolor: 'divider',
                      left: 'calc(var(--ListItem-paddingLeft) + 12px)',
                      top: '50%',
                    },
                  }}
                >
                  <Avatar
                          src={image}
                          sx={{ '--Avatar-size': '24px' }}
                        />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="title-sm">{project.title}</Typography>
                  <Typography level="body-xs">{project.description}</Typography>
                </ListItemContent>
                <Typography level="body-xs">{project.taskitemNavigation.length} Задач</Typography>
              </ListItem>

            ))}
          </List>
         
          </Sheet>))} 
 </List>
          </>

          );
        }
          
         
        
         export default MyTeam;
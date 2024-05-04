import { SetStateAction, useEffect, useState } from 'react';
import HeaderTop from '../components/HeaderTop';
import { List, Sheet, Typography } from '@mui/joy';
import { ProjectItem } from '../models/projectitem';
import userService from "../services/user.service";
import Endpoints from "../services/endpoints";
import ProjectItemService from '../services/projectitemservice';
import ProjectCard from '../components/ProjectCard';


function Projects() {
  const [ProjectList, setProjectList] = useState<ProjectItem[]>([]);

  useEffect(() => {
    ProjectItemService.getAllProjects().then((res: { data: SetStateAction<ProjectItem[]>; }) => {
      setProjectList(res.data);
    });
  }, []);

  return (
    <>
    <HeaderTop Header='Проекты' />
    <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {ProjectList.length==0? <Typography level="body-sm">Здесь пока нет никаких проектов...</Typography> : 
            ProjectList.map((item:ProjectItem, index: number) => 
            (
            <ProjectCard id={item.id} title={item.title} description={item.description} userNavigation={item.userNavigation} taskitemNavigation={item.taskitemNavigation} />
            ))}
          </List>
          
    </>
  );
}

export default Projects;
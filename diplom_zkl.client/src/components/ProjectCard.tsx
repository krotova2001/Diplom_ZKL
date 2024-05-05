import { Avatar, Chip, Sheet } from '@mui/joy';
import { Divider } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { ProjectItem } from '../models/projectitem';
import { TaskItemModel } from '../models/taskitem';
import { User } from '../models/user';
import Endpoints from '../services/endpoints';

function ProjectCard(MyProject: ProjectItem) {

    return (
        <>
        <Sheet
                key={MyProject?.id}
                component="li"
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              >
                <Typography level="title-md">{MyProject?.title}</Typography>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography level="body-xs">{MyProject?.description}</Typography>
                <Divider component="div" sx={{ my: 2 }} />
                {MyProject.taskitemNavigation.map((item:TaskItemModel) =>  
                (
                       <Chip
                           key={item.id}
                           variant="outlined"
                           color="primary"
                           size="sm"
                           sx={{ mr: 1 }}
                       >
                           {item.title}
                       </Chip>
                   )
                  )}
                <Divider component="div" sx={{ my: 2 }} />
                {MyProject.userNavigation.map((item:User) =>  
                (
                  <>
                       <Chip
                           key={item.id}
                           variant="outlined"
                           color="primary"
                           size="sm"
                           sx={{ mr: 1 }}
                       >
                           {item.name}
                       </Chip>
                       <Avatar 
                       src={Endpoints.API_URL + item.pictureUrl}
                       sx={{ maxWidth: '32px', maxHeight: '32px' }}
                       />
                       </>
                   )
                  )}
                
              </Sheet>
        </>
    );
}

export default ProjectCard;
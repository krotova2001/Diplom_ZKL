import { Chip, Sheet } from '@mui/joy';
import { Divider } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { ProjectItem } from '../models/projectitem';

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
                
              </Sheet>
        </>
    );
}

export default ProjectCard;
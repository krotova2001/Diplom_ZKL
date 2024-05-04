import {TaskItemModel} from '../models/taskitem';
import { Chip, Sheet } from '@mui/joy';
import { Divider } from '@mui/material';
import Typography from '@mui/joy/Typography';

function TaskItemCard(Mytask: TaskItemModel) {

    return (
        <>
        <Sheet
                key={Mytask?.id}
                component="li"
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              >
                <Typography level="title-md">{Mytask?.title}</Typography>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography level="body-xs">{Mytask?.description}</Typography>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography level="body-xs">Старт</Typography>
                <Chip onClick={function(){}} variant="outlined">{Mytask?.start?.toLocaleDateString()}</Chip>
                <Typography level="body-xs">Финиш</Typography>
                <Chip onClick={function(){}} variant="outlined">{Mytask?.end?.toLocaleDateString()}</Chip>
              </Sheet>
        </>
    );
}

export default TaskItemCard;
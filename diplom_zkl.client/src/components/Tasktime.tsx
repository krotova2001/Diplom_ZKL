
import { Box, Chip } from '@mui/joy';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

class Iprops {
    start?:Date | undefined;
    end?:Date | undefined
    }

function TaskTime(props:Iprops) {

    return (
        <>
        <Box sx={{ display: 'block', gap: 1, alignItems: 'left' }}>
      <Chip variant="soft" startDecorator={<OutlinedFlagTwoToneIcon />}  size="sm">
      {props.start?.toString()}
      </Chip>
      <Chip variant="soft" startDecorator={<AssignmentTurnedInOutlinedIcon />}  size="sm">
      {props.end?.toString()}
      </Chip>
    </Box>
        </>
    );
}

export default TaskTime;
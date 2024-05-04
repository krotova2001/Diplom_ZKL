
import { Box, Chip } from '@mui/joy';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import relativeTime from 'dayjs/plugin/relativeTime';

class Iprops {
    start?:Date | undefined;
    end?:Date | undefined
    }

function TaskTime(props:Iprops) {
    dayjs.locale('ru');
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
    const st = dayjs(props.start?.toString()).format('lll');
    const en = dayjs(props.end?.toString()).format('lll');
    const ost = dayjs(Date()).to(props.end?.toString(), true);
    return (
        <>
        <Box sx={{ display: 'block', gap: 1, alignItems: 'left' }}>
      <Chip variant="soft" startDecorator={<OutlinedFlagTwoToneIcon />}  size="sm">
      {st}
      </Chip>
      <Chip variant="soft" startDecorator={<AssignmentTurnedInOutlinedIcon />}  size="sm">
      {en}
      </Chip><br/>
      <Chip variant="soft" startDecorator={<HourglassTopIcon />}  size="sm">
        Осталось {ost}
      </Chip>
    </Box>
        </>
    );
}

export default TaskTime;
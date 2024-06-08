import { Box, Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { Divider } from '@mui/joy';
import { SetStateAction, useEffect, useState } from 'react';
import { TaskItemModel } from '../../models/taskitem';
import TaskItemsService from '../../services/taskitemsservice';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';


function TaskReports() {
    const [TaskList, setTaskList] = useState<TaskItemModel[]>([]);

    const pieParams = { height: 200, margin: { right: 5 } };
    const palette = ['red', 'blue', 'green'];
    

    useEffect(() => {
        TaskItemsService.getAllTasks().then((res: { data: SetStateAction<TaskItemModel[]>; }) => {
          setTaskList(res.data);
            console.log(res.data);
            console.log(TaskList);
        });
      }, []);


    return (<>
    <Typography level='h4'> Выбор проекта </Typography>
    <Divider/>
    <Select defaultValue="dog" sx={{marginBottom: '2em'}}>
      <Option value="dog">Проект 1</Option>
      <Option value="cat">Проект 2</Option>
      <Option value="fish">Проект 3</Option>
    </Select>
    <Divider/>
      
    <Typography level='h4'> Состояние задач </Typography><br/>
    <Stack direction="row" width="100%" textAlign="center" spacing={4} sx={{paddingY:  '2em'}}>
      <Box flexGrow={1}>
        <Typography>Завершение</Typography>
        <PieChart
          series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography>В работе</Typography>
        <PieChart
          colors={palette}
          series={[{ data: [{ value: 10 }, { value: 15 }, { value: 30 }] }]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography>По длительности</Typography>
        <PieChart
          series={[
            { data: [{ value: 10, color: 'orange' }, { value: 15 }, { value: 10 }] },
          ]}
          {...pieParams}
        />
      </Box>
    </Stack>
    <Divider />
    <br/>
    <Typography level='h4'> Динамика выполнения задач </Typography>
    <Stack sx={{ width: '100%' }}>
     
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20] }]}
        series={[
          {
            data: [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8],
          },
          {
            data: [1, 2, 5.5, 2, 3, 4, 8.5, 1.5, 5],
           
            area: true,
          },
        ]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
        skipAnimation
      />
    </Stack>

    </>)
}
export default TaskReports;
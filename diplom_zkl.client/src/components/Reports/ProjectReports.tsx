import { Box, Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { Divider } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { ProjectItem } from '../../models/projectitem';
import ProjectItemService from '../../services/projectitemservice';
import { SetStateAction, useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { User } from '../../models/user';
import userService from '../../services/user.service';

type DataSet =
{
  name: string | undefined;
  value: number | undefined;
}

 function ProjectReports() {
    const [ProjectList, setProjectList] = useState<ProjectItem[]>([]);
    const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей
    //const [data, setData]  = useState<DataSet[]>([]);
  let data: DataSet[] = [];
    useEffect(() => {
        ProjectItemService.getAllProjects().then((res: { data: SetStateAction<ProjectItem[]>; }) => {
          setProjectList(res.data);
        });
        userService.getAllUsers().then(result => {
          setallUsers(result.data);
        });
        
      }, []);
      
      allUsers.map((item:User)=>(
        data.push({ name: item.name, value: item.name?.length  })));

    return (
        <>
        <Typography level='h4'> Выполнение проектов </Typography>
        {ProjectList.map((item:ProjectItem)=>(
            <Stack
            key={item.id}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            >
                <Box width={200}>
                <Typography level="body-md" >
                {item.title}
                </Typography>
                <Divider/>
                <Typography level="body-sm" >{item.description}</Typography>
                </Box>
                    <Gauge
                    height={100}
                    width={200}
                        value={75}
                        startAngle={-110}
                        endAngle={110}
                        sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 20,
                            transform: 'translate(0px, 0px)',
                            },
                        }}
                        text={
                            ({ value, valueMax }) => `${value} / ${valueMax}`
                        }/>
            </Stack>
                
        ))}
        <Divider />
<Stack
spacing={5}
> 
<Typography level='h4'> Задействованность пользователей в проектах </Typography>
<BarChart
      yAxis={[{ scaleType: 'band', dataKey: 'name'}]} 
      layout="horizontal"
      dataset={data}
      series={[{ dataKey: 'value', label: 'кол-во задач'}]}
      width={500}
      height={300}
      colors={['lightblue']}
    />
<Divider />
</Stack>
        <Stack
        marginTop={5}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            >
        <Typography level='h4'> Средний % выполнения <br/> всех проектов </Typography>
        <Gauge
      width={120}
      height={120}
      value={85}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
    </Stack> 
     </>
    )
}

export default ProjectReports;
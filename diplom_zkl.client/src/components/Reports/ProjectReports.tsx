import { Box, Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { Divider } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { ProjectItem } from '../../models/projectitem';
import ProjectItemService from '../../services/projectitemservice';
import { SetStateAction, useEffect, useState } from 'react';

 function ProjectReports() {
    const [ProjectList, setProjectList] = useState<ProjectItem[]>([]);
    useEffect(() => {
        ProjectItemService.getAllProjects().then((res: { data: SetStateAction<ProjectItem[]>; }) => {
          setProjectList(res.data);
          console.log(res.data);
        });
      }, []);
      
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
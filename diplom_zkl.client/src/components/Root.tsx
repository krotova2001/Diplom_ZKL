import { ColorPaletteProp, Sheet, Stack } from '@mui/joy';
import Box, { BoxProps } from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/material';

type HomeText = {id:number, header:String, text: String}

const colors = ['neutral', 'primary','secondary','success', 'warning', 'danger']

function SetRandomColors():ColorPaletteProp {
    const index: number = Math.floor(Math.random()  *  colors.length); 
    return colors[index] as ColorPaletteProp;
   }


function Root(props: BoxProps) {

    const content:HomeText[] = [
        {id:1, header:'Моя команда', text: 'Здесь вы увидите людей, связанных с вами в проекте'},
        {id:2, header:'Настройки аккаунта', text: 'Настройки оповещений, контроля задач и т.д.'},
        {id:3, header:'Мои проекты', text: 'Проекты, в которых вы участвуете'},
        {id:4, header:'Мои задачи', text: 'Задачи, иполнителем которых вы являетесь'},
        {id:5, header:'Сообщения', text: 'Вереница сообщений-  комментариев в рамках задачи'},
        {id:6, header:'Проекты', text: 'Все проекты системы'},
        {id:7, header:'Задачи', text: 'Все задачи проекта'},
        {id:8, header:'Отчеты', text: 'Различная иконографика, а также отчеты по проекту'},
        {id:9, header:'О проекте', text: 'Информация о команде разработчиков, работавших над дипломным проектом'},
    ];

    console.log(SetRandomColors());

    return (
       <>
       <Stack 
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={10}
        flexWrap='wrap' >
       {content.map((item:HomeText) =>  (
<div style={{ marginTop: 10}}>
        <Card variant="soft" 
        sx={{ 
            maxWidth: 300,
            minWidth: 200,
            marginY: 3,
            boxShadow: 1,
            borderColor: SetRandomColors(),
           
        }} 
        color = {SetRandomColors()}
        >
            <Typography level="h4" fontSize="xl" sx={{ mb: 0.5 }}>
            {item.header}
            </Typography>
            <Divider/>
            <Typography>
            {item.text}       
            </Typography>
        </Card>
        </div>
       ))}
       </Stack>
        </>
    );
}

export default Root;
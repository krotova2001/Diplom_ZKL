import  { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HeaderTop from '../components/HeaderTop';
import { TaskItemModel } from '../models/taskitem';
import TaskItemsService from '../services/taskitemsservice';
import { AspectRatio, Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy';
import { Controller, useForm } from 'react-hook-form';

function Task() {
  const params = useParams();
  const prodId = params.id;
  const [Task, setTask] = useState<TaskItemModel>();

  const { handleSubmit, control } = useForm<TaskItemModel>(
    {
        defaultValues: Task
    }
);

  useEffect(() => {
    TaskItemsService.getTask(prodId).then((res) => {
      setTask(res.data);
    
    });
  }, []);

  function Save()
  {

  }

  return (
    <>
    <HeaderTop Header="Редактирование задачи" />
    <Box sx={{ flex: 1, width: '70%' }}>
                        <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="title-md">{` ${Task?.title}`}</Typography>
                                    <Typography level="body-sm">
                                    {` ${Task?.description}`}
                                    </Typography>
                                </Box>
                                <Divider />

                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                                >
                                    <Stack direction="column" spacing={1}>

                                    </Stack>
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <FormLabel>Имя</FormLabel>
                                            <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) =>
                                                        <Input {...field} size="sm" placeholder="Имя" value={Task?.description}  />} />
                                                <Controller
                                                    name="statement"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) =>
                                                        <Input {...field} size="sm" placeholder="Фамилия" sx={{ flexGrow: 1 }} value={Task?.statement}  />} />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <FormControl>
                                                <FormLabel>Роль</FormLabel>
                                                <Input size="sm" defaultValue="Разработчик React" />
                                            </FormControl>
                                            <FormControl sx={{ flexGrow: 1 }}>
                                                <FormLabel>Email</FormLabel>
                                               
                                            </FormControl>
                                        </Stack>
                                        <div>
                                           
                                        </div>
                                        <div>
                                            
                                        </div>
                                    </Stack>
                                </Stack>

                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button size="sm" variant="outlined" color="neutral">
                                            Отмена
                                        </Button>
                                        <Button size="sm" variant="solid" type="submit" onClick={Save}>
                                            Сохранить
                                        </Button>
                                    </CardActions>
                                </CardOverflow>
                        </Card>
                        </Box>
    </>
  );
}

export default Task;
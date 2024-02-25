import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Snackbar from '@mui/joy/Snackbar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import DropZone from './DropZone';
import FileUpload from './FileUpload';
import CountrySelector from './CountrySelector';
import EditorToolbar from './EditorToolbar';
import { User } from '../../models/user';
import authService from '../../services/auth.service';



export default function UserAbout() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [CurrentUser, setcurrentUser] = useState<User>();
    const { register, handleSubmit, control } = useForm<User>(
        {
            defaultValues: CurrentUser
        }
    );

    const onSubmit: SubmitHandler<User> = (data) => {
        console.log(data);
        //authService.saveUser(CurrentUser?.id, CurrentUser);
    };

    function Save() {
        authService.saveUser(CurrentUser?.id, CurrentUser).then((result)=>
        {  if(result.status.toFixed(0) === "200"){
            setOpenSnackbar(true);
        }}).catch((error)=>{console.log(error)});
    }

    useEffect(() => {
        authService.getCurrentUser().then(user => {
            setcurrentUser(user.data);
        });
    }, []);

    const onChangeHandler = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        const tempUser: User = { ...CurrentUser, [name]: value } as User;
        setcurrentUser(tempUser);
        console.log(tempUser);
    }

        return (
            <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: { sm: -100, md: -110 },
                            bgcolor: 'background.body',
                            zIndex: 9995,
                        }}
                    >
                        <Box sx={{ px: { xs: 2, md: 6 } }}>

                            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                                Обо мне
                            </Typography>
                        </Box>

                    </Box>
                    <Stack
                        spacing={4}
                        sx={{
                            display: 'flex',
                            maxWidth: '800px',
                            mx: 'auto',
                            px: { xs: 2, md: 6 },
                            py: { xs: 2, md: 3 },
                        }}
                    >
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Обо мне</Typography>
                                <Typography level="body-sm">
                                    Настройте, как информация о вашем профиле будет отображаться в сети
                                </Typography>
                            </Box>
                            <Divider />

                            <Stack
                                direction="row"
                                spacing={3}
                                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                            >
                                <Stack direction="column" spacing={1}>
                                    <AspectRatio
                                        ratio="1"
                                        maxHeight={200}
                                        sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <IconButton
                                        aria-label="upload new picture"
                                        size="sm"
                                        variant="outlined"
                                        color="neutral"
                                        sx={{
                                            bgcolor: 'background.body',
                                            position: 'absolute',
                                            zIndex: 2,
                                            borderRadius: '50%',
                                            left: 100,
                                            top: 170,
                                            boxShadow: 'sm',
                                        }}
                                    >
                                        <EditRoundedIcon />
                                    </IconButton>
                                </Stack>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                            <Controller
                                                name="name"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) =>
                                         <Input {...field} size="sm" placeholder="Имя" value={CurrentUser?.name} onChange={onChangeHandler} />} />
                                            <Controller
                                                name="surname"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) =>

                                        <Input {...field} size="sm" placeholder="Фамилия" sx={{ flexGrow: 1 }} value={CurrentUser?.surname} onChange={onChangeHandler} />} />
                                        </FormControl>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <FormControl>
                                            <FormLabel>Роль</FormLabel>
                                            <Input size="sm" defaultValue="Разработчик React" />
                                        </FormControl>
                                        <FormControl sx={{ flexGrow: 1 }}>
                                            <FormLabel>Email</FormLabel>
                                            <Controller
                                                name="email"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) =>
                                            <Input
                                            {...field}
                                                size="sm"
                                                type="email"
                                                startDecorator={<EmailRoundedIcon />}
                                                placeholder={CurrentUser?.email}
                                                value={CurrentUser?.email}
                                                sx={{ flexGrow: 1 }}
                                                onChange={onChangeHandler} />} />

                                        </FormControl>
                                    </Stack>
                                    <div>
                                        <CountrySelector />
                                    </div>
                                    <div>
                                        <FormControl sx={{ display: { sm: 'contents' } }}>
                                            <FormLabel>Часовой пояс</FormLabel>
                                            <Select
                                                size="sm"
                                                startDecorator={<AccessTimeFilledRoundedIcon />}
                                                defaultValue={CurrentUser?.TimeZone}

                                            >
                                                <Option value="1">
                                                    Indochina Time (Bangkok){' '}
                                                    <Typography textColor="text.tertiary" ml={0.5}>
                                                        — GMT+07:00
                                                    </Typography>
                                                </Option>
                                                <Option value="2">
                                                    Indochina Time (Ho Chi Minh City){' '}
                                                    <Typography textColor="text.tertiary" ml={0.5}>
                                                        — GMT+07:00
                                                    </Typography>
                                                </Option>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Stack>
                            </Stack>

                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Отмена
                                    </Button>
                                    <Button size="sm" variant="solid" type="submit" onClick={Save }>
                                        Сохранить
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Биография</Typography>
                                <Typography level="body-sm">
                                    Создайте краткое описание вашего профиля.
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <EditorToolbar />
                                <Controller
                                                name="biography"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) =>
                                <Textarea
                                {...field}
                                    size="sm"
                                    minRows={4}
                                    sx={{ mt: 1.5 }}
                                    value={CurrentUser?.biography}
                                    onChange={onChangeHandler} />}

                                   
                                />
                                <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                                    275 characters left
                                </FormHelperText>
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Отмена
                                    </Button>
                                    <Button size="sm" variant="solid" onClick={Save}>
                                        Сохранить
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>

                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Портфолио проектов</Typography>
                                <Typography level="body-sm">
                                    Поделиться примерами своих работ
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <DropZone />
                                <FileUpload
                                    icon={<InsertDriveFileRoundedIcon />}
                                    fileName="Tech design requirements.pdf"
                                    fileSize="200 kB"
                                    progress={100}
                                />
                                <FileUpload
                                    icon={<VideocamRoundedIcon />}
                                    fileName="Dashboard prototype recording.mp4"
                                    fileSize="16 MB"
                                    progress={40}
                                />
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Отмена
                                    </Button>
                                    <Button size="sm" variant="solid">
                                        Сохранить
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </Stack>

                </Box>
            </form>
            <Snackbar 
               variant="soft"
               color="success"
               open={openSnackbar}
               onClose={() => setOpenSnackbar(false)}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               autoHideDuration={3000}>
               Изменения сохранены
               </Snackbar>
            </>
        );
    }

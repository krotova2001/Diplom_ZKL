/* eslint-disable @typescript-eslint/no-explicit-any */
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
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CountrySelector from './CountrySelector';
import EditorToolbar from './EditorToolbar';
import { User } from '../../models/user';
import authService from '../../services/auth.service';
import Endpoints from "../../services/endpoints";
import UserService from "../../services/user.service";

export default function UserAbout() {
    const [openSnackbar, setOpenSnackbar] = useState(false); //всплывашка справа
    const [CurrentUser, setcurrentUser] = useState<User>(); //текущий пользователь
    const [selectedImage, setSelectedImage] = useState<File>();

    const { handleSubmit, control } = useForm<User>(
        {
            defaultValues: CurrentUser
        }
    );

    const onSubmit: SubmitHandler<User> = (data) => {
        console.log(data);
        //authService.saveUser(CurrentUser?.id, CurrentUser);
    };

    //сохранить изменения
    function Save() {
        authService.saveUser(CurrentUser?.id, CurrentUser).then((result) => {
            if (result.status.toFixed(0) === "200") {
                setOpenSnackbar(true);
            }
        }).catch((error) => { console.log(error) });
        if (selectedImage != undefined) {
            UserService.uploadUserPhoto(selectedImage);
        }
    }

    //загрузить текущего юзера на страницу
    useEffect(() => {
        authService.getCurrentUser()?.then(user => {
            if (selectedImage == undefined) {
                setcurrentUser(user.data);
                console.log(user.data);
            }
        });
    }, []);

    //записать свойство в объект юзера
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
                                                src={selectedImage != undefined ? URL.createObjectURL(selectedImage) : Endpoints.API_URL + CurrentUser?.pictureUrl}
                                                loading="lazy"
                                                alt="У вас не загружено фото"
                                            />
                                        </AspectRatio>


                                        <input accept="image/*" id="icon-button-file"
                                            type="file" style={{ display: 'none' }} onChange={(event) => {
                                                console.log(event.target.files?.[0]);
                                                setSelectedImage(event.target.files?.[0]);
                                            }} />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture"
                                                sx={{
                                                    bgcolor: 'background.body',
                                                    position: 'absolute',
                                                    zIndex: 2,
                                                    borderRadius: '50%',
                                                    left: 100,
                                                    top: 170,
                                                    boxShadow: 'sm',
                                                }}
                                                size="sm"
                                                variant="outlined"
                                                component="span">
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </label>




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
                                        <Button size="sm" variant="solid" type="submit" onClick={Save}>
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

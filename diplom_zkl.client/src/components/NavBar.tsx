import { Link, NavLink } from 'react-router-dom'
import * as React from 'react';
import useAuth from "../hooks/useAuth";
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
//import TeamNav from './LeftBar';
import Endpoints from "../services/endpoints";
import { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import { User } from '../models/user';

//доп ссылка для админов
function adminPanelLink() {
    if(true){

        return (  <MenuItem>
            <SettingsRoundedIcon />
            <NavLink to='/admin'>
                Панель администратора
                </NavLink >
        </MenuItem>)
    }
    else{
        return <> </>;
    
    }
    
}

//верхняя полоска навигации
function NavBar() {
    const [open, setOpen] = React.useState(false);
    const { isAuthenticated } = useAuth();
    const [CurrentUser, setcurrentUser] = useState<User>(); //текущий пользователь

    useEffect(() => {
        authService.getCurrentUser()?.then(user => {
            setcurrentUser(user.data);
        });
    }, []);

    if (isAuthenticated == true) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    margin: '10px',
                }}
            >
               <TopTopBar />

                <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                    <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
                        <MenuRoundedIcon />
                    </IconButton>
                    <Drawer
                        sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <ModalClose />
                        <DialogTitle>Три толстяка</DialogTitle>
                        <Box sx={{ px: 1 }}>
                            
                        <TopBarCollapse />

                        </Box>
                    </Drawer>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1.5,
                        alignItems: 'center',
                    }}
                >
                    <Input
                        size="sm"
                        variant="outlined"
                        placeholder="Поиск..."
                        startDecorator={<SearchRoundedIcon color="primary" />}
                        endDecorator={
                            <IconButton
                                variant="outlined"
                                color="neutral"
                                sx={{ bgcolor: 'background.level1' }}
                            >
                                <Typography level="title-sm" textColor="text.icon">
                                    ⌘ K
                                </Typography>
                            </IconButton>
                        }
                        sx={{
                            alignSelf: 'center',
                            display: {
                                xs: 'none',
                                sm: 'flex',
                            },
                        }}
                    />
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{ display: { xs: 'inline-flex', sm: 'none' }, alignSelf: 'center' }}
                    >
                        <SearchRoundedIcon />
                    </IconButton>
                    <Tooltip title="Joy UI overview" variant="outlined">
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            component="a"
                            href="/blog/first-look-at-joy/"
                            sx={{ alignSelf: 'center' }}
                        >
                            <BookRoundedIcon />
                        </IconButton>
                    </Tooltip>
                 
                    <Dropdown>
                        <MenuButton
                            variant="plain"
                            size="sm"
                            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
                        >
                            <Avatar
                                src={Endpoints.API_URL + CurrentUser?.pictureUrl}
                                sx={{ maxWidth: '32px', maxHeight: '32px' }}
                            />
                        </MenuButton>
                        <Menu
                            placement="bottom-end"
                            size="sm"
                            sx={{
                                zIndex: '99999',
                                p: 1,
                                gap: 1,
                                '--ListItem-radius': 'var(--joy-radius-sm)',
                            }}
                        >
                            <MenuItem>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={Endpoints.API_URL + CurrentUser?.pictureUrl}
                                        sx={{ borderRadius: '50%' }}
                                    />
                                    <Box sx={{ ml: 1.5 }}>
                                        <Typography level="title-sm" textColor="text.primary">
                                            {CurrentUser?.name +' ' + CurrentUser?.surname}
                                        </Typography>
                                        <Typography level="body-xs" textColor="text.tertiary">
                                            { CurrentUser?.email }
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem>
                                <HelpRoundedIcon />
                                Помощь
                            </MenuItem>
                            <MenuItem>
                                <SettingsRoundedIcon />
                                <NavLink to='/user/about'>
                                    Настройки профиля
                                    </NavLink >
                            </MenuItem>
                            {adminPanelLink()}
                            <ListDivider />
                            <MenuItem component="a" href="mailto:zvuk24@gmail.com">
                                Написать разработчикам
                                <OpenInNewRoundedIcon />
                            </MenuItem>
                            <MenuItem
                                component="a"
                                href="https://github.com/krotova2001/Diplom_ZKL"
                            >
                                Этот проект на GitHub
                                <OpenInNewRoundedIcon />
                            </MenuItem>
                            <ListDivider />
                            <Link to="/logout">
                            <MenuItem>
                                <LogoutRoundedIcon />
                                Выйти
                            </MenuItem>
                            </Link>
                        </Menu>
                    </Dropdown>
                </Box>
            </Box>
           
        );
    }
    else
        return (<></>);
}
    export default NavBar

    function TopTopBar() {
        return (<>
         <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                    <IconButton
                        size="md"
                        variant="outlined"
                        color="neutral"
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' },
                            borderRadius: '50%',
                          
                        }}
                    >
                    <LanguageRoundedIcon />
                    </IconButton>

                    <TopBarCollapse />

                </Stack>

        </>)

    }

    function TopBarCollapse() {
        return (<>
        
        <Link to="/">
                    <Button
                        variant="plain"
                        color="neutral"
                        component="a"
                        size="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Домой
                    </Button>
                    </Link>

                    <Link to="/projectlist">
                    <Button
                        variant="plain"
                        color="neutral"
                        aria-pressed="false"
                        component="a"
                        size="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Проекты
                        </Button>
                    </Link>

                    <Link to="/tasklist">
                    <Button
                        variant="plain"
                        color="neutral"
                        component="a"
                        size="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Задачи
                        </Button>
                    </Link>

                    <Link to="/reports">
                        <Button
                            variant="plain"
                            color="neutral"
                            component="a"
                            size="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Отчеты
                        </Button>
                    </Link>

                    <Link to="/about">
                        <Button
                            variant="plain"
                            color="neutral"
                            component="a"
                            size="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            О проекте
                        </Button>
                    </Link>
        </>);
    }
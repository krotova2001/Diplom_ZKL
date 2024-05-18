import useAuth from "../hooks/useAuth";
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Link } from "react-router-dom";


//панель слева
export default function LeftBar() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated == true) {
        return (
            <List
                size="sm"
                sx={{  '--ListItem-radius': 'var(--joy-radius-sm)', '--List-gap': '4px',marginLeft:'5px' }}
            >
                <ListItem nested>
                    <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                        Личная панель
                    </ListSubheader>
                    <List
                        aria-labelledby="nav-list-browse"
                        sx={{
                            '& .JoyListItemButton-root': { p: '8px' },
                        }}
                    >
                       <Link to="/myteam" style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton selected>
                                <ListItemDecorator>
                                    <PeopleRoundedIcon fontSize="small" />
                                </ListItemDecorator>
                                <ListItemContent sx={{display: { xs: 'none', md: 'block' }}}>Моя команда</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        </Link>

                        <Link to="/MySettings" style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <AssignmentIndRoundedIcon fontSize="small" />
                                </ListItemDecorator>
                                <ListItemContent sx={{display: { xs: 'none', md: 'block' }}}>Настройки аккаунта</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        </Link>

                        <Link to="/project" style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <AccountTreeRoundedIcon fontSize="small" />
                                </ListItemDecorator>
                                <ListItemContent sx={{display: { xs: 'none', md: 'block' }}}>Мои проекты</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        </Link>

                        <Link to="/mytasks" style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <TodayRoundedIcon fontSize="small" />
                                </ListItemDecorator>
                                <ListItemContent sx={{display: { xs: 'none', md: 'block' }}}>Мои задачи</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        </Link>

                        <Link to="/mymessages" style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <ArticleRoundedIcon fontSize="small" />
                                </ListItemDecorator>
                                <ListItemContent sx={{display: { xs: 'none', md: 'block' }}}>Сообщения</ListItemContent>
                                <Chip variant="soft" color="warning" size="sm">
                                    2
                                </Chip>
                            </ListItemButton>
                        </ListItem>
                        </Link>

                    </List>
                </ListItem>
            </List>
        );
    }
    else
        return (<></>);
}
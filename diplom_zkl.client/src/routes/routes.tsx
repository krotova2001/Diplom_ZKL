import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Main from '../pages/Main';
import Login from '../pages/LogIn/Login';
import Admin from '../pages/Utils/Admin';
import Logout from '../pages/LogIn/Logout';
import PasswordReset from '../pages/LogIn/PasswordReset';
import UserAbout from '../pages/Utils/UserAbout';
import TaskList from '../pages/TaskList';
import { Task } from '@mui/icons-material';
import Projects from '../pages/Projects';
import Project from '../pages/Project';

export const useRoutes = () => {
    return (
        <Routes>
           
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route index element={<Main />} />
                <Route path="/" element={<Main />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/passwordreset" element={<PasswordReset />} />
                <Route path='/user/about' element={<UserAbout />} />

                <Route path='/tasklist' element={<TaskList />} />
                <Route path='/task' element={<Task />} />
                <Route path='/projectlist' element={<Projects />} />
                <Route path='/project' element={<Project />} />
            </Route>
        </Routes>
    )
}

export default useRoutes

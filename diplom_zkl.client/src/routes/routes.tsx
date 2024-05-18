import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Main from '../pages/Home';
import Login from '../pages/LogIn/Login';
import Admin from '../pages/Utils/Admin';
import Logout from '../pages/LogIn/Logout';
import PasswordReset from '../pages/LogIn/PasswordReset';
import UserAbout from '../pages/Utils/UserAbout';
import TaskList from '../pages/TaskList';
import Task from '../pages/Task';
import Projects from '../pages/Projects';
import Project from '../pages/Project';
import Home from '../pages/Home';
import Reports from '../pages/Reports';
import AboutDiplom from '../pages/AboutDiplom';
import MyTeam from '../pages/MyTeam';
import MySettings from '../pages/MySettings';
import MyTasks from '../pages/MyTasks';
import MyMessages from '../pages/MyMessages';

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route index element={<Main />} />
                <Route path="/" element={<Home />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/passwordreset" element={<PasswordReset />} />
                <Route path='/user/about' element={<UserAbout />} />
                <Route path='/tasklist' element={<TaskList />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/task/:id' element={<Task />} />
                <Route path='/projectlist' element={<Projects />} />
                <Route path='/project' element={<Project />} />
                <Route path='/about' element={<AboutDiplom />} />
                <Route path='/myteam' element={<MyTeam />} />
                <Route path='/MySettings' element={<MySettings />} />
                <Route path='/mytasks' element={<MyTasks />} />
                <Route path='/mymessages' element={<MyMessages />} />
            </Route>
        </Routes>
    )
}

export default useRoutes

import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Logout from '../pages/Logout';
import PasswordReset from '../pages/PasswordReset';

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
            </Route>
        </Routes>
    )
}

export default useRoutes

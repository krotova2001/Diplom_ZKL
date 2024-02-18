import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class UserService {
    getPublicContent() {
        return axios.get(Endpoints.API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(Endpoints.API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(Endpoints.API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(Endpoints.API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
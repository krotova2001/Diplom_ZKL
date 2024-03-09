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
 
    //загрузи фото пользователя
    uploadUserPhoto(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(Endpoints.API_URL + 'users/uploadphoto/'+`${JSON.parse(localStorage.getItem('userInfo')).id}`, formData, {headers: authHeader(),
            "Content-Type": "multipart/form-data", onUploadProgress: onUploadProgress});
    }
}

export default new UserService();
import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class UserService {
   createUser(newUser) {
    return axios.post(Endpoints.API_URL + 'users', newUser, {headers: authHeader()});
   
   }

    getAllUsers() {
        return axios.get(Endpoints.API_URL + 'users', { headers: authHeader() });
    }

    deleteUser(id) {
        debugger;
        return axios.delete(Endpoints.API_URL + 'users/' + id, { headers: authHeader() });
    }
 
    //загрузить фото пользователя
    uploadUserPhoto(file) {
        let formData = new FormData();
        formData.append('id', `${JSON.parse(localStorage.getItem('userInfo')).id}`);
        formData.append("file", file);
        return axios.post(Endpoints.API_URL + 'Users/uploadphoto', formData, {headers: authHeader(),
            "Content-Type": "multipart/form-data"});
    }
}

export default new UserService();
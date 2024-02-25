import axios from "axios";
import Endpoints from "./endpoints";
import { Token } from "@mui/icons-material";
import authHeader from './auth-header';


class AuthService {
    login(login, password) {
        return axios
            .post(Endpoints.login, {
                login,
                password
            })
            .then(response =>
            {
                if (response.data.access_token) {
                    localStorage.setItem("userInfo", JSON.stringify(response.data));
                    localStorage.setItem("userId", JSON.stringify(response.data.id));
                }
                return response.data.access_token;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    //доделать, еще не готово
    register(username, email, password) {
        return axios.post(Endpoints.API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return axios.get(Endpoints.API_URL + "users/" + `${JSON.parse(localStorage.getItem('userInfo')).id}`, { headers: authHeader() })
    }

    saveUser(id, user) {
        console.log(user);
        return axios.put(Endpoints.API_URL + "users/" + id, { user }.user, { headers: authHeader() });  
    }
}

export default new AuthService();
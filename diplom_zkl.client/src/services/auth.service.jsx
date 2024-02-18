import axios from "axios";
import Endpoints from "./endpoints";


class AuthService {
    login(login, password) {
        return axios
            .post(`http://localhost:5216/login`, {
                login,
                password
            })
            .then(response =>
            {
                //if (response.data.access_token) {
                //    localStorage.setItem("user", JSON.stringify(response.data));
                //}
                console.log(response.data)
                return response.data.access_token;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(Endpoints.API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
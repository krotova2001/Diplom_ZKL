import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class ProjectItemService {

     // получить проекты, в которых задействован тот, кто запрашивает
    getProject(userid) {
        userid==undefined?userid=JSON.parse(localStorage.getItem('userId')):userid;
        return axios.get(Endpoints.PROJECT_API + userid, { headers: authHeader() });
    }

    getProject(id) {
        return axios.get(Endpoints.PROJECT_API +'Detail/' + id, { headers: authHeader() });
    }

    getAllProjects() {
        return axios.get(Endpoints.PROJECT_API, { headers: authHeader() });
    }

    createProject(project) {
        project.authorId = JSON.parse(localStorage.getItem('userId'));
        return axios.post(Endpoints.PROJECT_API, task, { headers: authHeader() });
    }

    saveProject(task) {
        return axios.put(Endpoints.PROJECT_API + task.id, task, { headers: authHeader() });
    }

    deleteProject(id) {
        return axios.delete(Endpoints.PROJECT_API + id, { headers: authHeader() });
    }

}

export default new ProjectItemService();
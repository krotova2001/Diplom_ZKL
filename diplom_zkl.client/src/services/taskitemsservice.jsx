import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class TaskItemsService {
    getTask(id) {
        return axios.get(Endpoints.TASKS_API + id, { headers: authHeader() });
    }

    getAllTasks() {
        return axios.get(Endpoints.TASKS_API, { headers: authHeader() });
    }

    createTask(task) {
        return axios.post(Endpoints.TASKS_API, task, { headers: authHeader() });
    }

}

export default new TaskItemsService();
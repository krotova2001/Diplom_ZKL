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
        task.authorId = JSON.parse(localStorage.getItem('userId'));
        return axios.post(Endpoints.TASKS_API, task, { headers: authHeader() });
    }

    saveTask(task) {
        return axios.put(Endpoints.TASKS_API + task.id, task, { headers: authHeader() });
    }

    deleteTask(id) {
        return axios.delete(Endpoints.TASKS_API + id, { headers: authHeader() });
    }

}

export default new TaskItemsService();
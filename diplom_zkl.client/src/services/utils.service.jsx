import axios from 'axios';

class UtilsService {

    getCurrentWeather() {
        return axios.get('https://api.openweathermap.org/data/2.5/weather?lat=56.0184&lon=92.8672&appid=adce3febb65748db8d580e57410ae624&units=metric');
    }
}

export default new UtilsService();
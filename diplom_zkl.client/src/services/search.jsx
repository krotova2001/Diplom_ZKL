import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class YandexSearch {
    settings = {
    apiKey:'035e75ec-4e91-4917-8ff8-7e2cdcc71159',
    searchid: '7970269',
    }

   search(query) {
    return axios.get(`https://catalogapi.site.yandex.net/v1.0?apiKey=035e75ec-4e91-4917-8ff8-7e2cdcc71159&text=${query}&searchid=7970269&page=0&available=true`);
   }

   //https://catalogapi.site.yandex.net/v1.0?apikey=c24a2422-ac83-4c9f-98a6-d500b7d164a2&text=розовый%20слон&searchid=1111111&page=0&available=true&price_low=3999.1&price_high=4000.1&category_id=49&e_param_85=розовый

   
}

export default new YandexSearch();
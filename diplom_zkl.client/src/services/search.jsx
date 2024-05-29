import axios from 'axios';
import authHeader from './auth-header';
import Endpoints from "./endpoints";

class NasaSearch {
    settings = {
    apiKey:'035e75ec-4e91-4917-8ff8-7e2cdcc71159',
    searchid: '7970269',
    }

   search(query) {
    return axios.get(`https://images-api.nasa.gov/search?q=${query}&page_size=20`);
   }

   

   
}

export default new NasaSearch();
import axios from 'axios';
import urls from './urls'


const axios_instance = axios.create({
	baseURL: urls.BASE_URL,
	timeout: 50000,
});
export default axios_instance
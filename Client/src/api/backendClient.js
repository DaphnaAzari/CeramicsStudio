import axios from 'axios';

const backendClient = axios.create({
    // /users removed for now to see if that helps
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    withCredentials: false, //added so CORS rules stay clear:
});
export default backendClient;




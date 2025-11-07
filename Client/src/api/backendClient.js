import axios from 'axios';


const backendClient = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    withCredentials: false, // added so CORS rules stay clear
})

export default backendClient;
import axios from 'axios';

const backendClient = axios.create({
    // /users removed for now to see if that helps
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    withCredentials: false, //added so CORS rules stay clear:
});
export default backendClient;



// import axios from 'axios';


// const backendClient = axios.create({
//     baseURL: 'http://localhost:3000/',
//     timeout: 5000,

//added so CORS rules stay clear:
//     withCredentials: false, 
// })

// export default backendClient;
import backendClient from "./backendClient";

const createUser = async (userData) => {
    console.log("in createuser", userData)
    const response = await backendClient.post('user/', userData);
    console.log("response", response)
    return response.data;
}

export default createUser;


// import backendClient from "./backendClient";

// const createUser = async (userData) => {
//     console.log("in createuser", userData)
//     const response = await backendClient.post('user/', userData);
//     console.log("response", response)
//     return response.data;
// }

// export default createUser;
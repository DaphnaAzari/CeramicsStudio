import backendClient from "./backendClient";

const createUser = async (userData) => {
    try {
        const response = await backendClient.post('user/', userData, {
            headers: userData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}
        });

        return response.data;
    } catch (err) {
        console.error("Error in createUser:", err.response?.data || err.message);
        throw err;
    }
}

export default createUser;
// import backendClient from "./backendClient";

// const createUser = async (userData) => {
//     try {
//         let payload;

//         if (userData.imageFile) {
//             // If there is an image, use FormData
//             payload = new FormData();
//             payload.append("firstName", userData.firstName);
//             payload.append("lastName", userData.lastName);
//             payload.append("userName", userData.userName);
//             payload.append("email", userData.email);
//             payload.append("password", userData.password);
//             payload.append("instagram", userData.instagram || "");
//             payload.append("website", userData.website || "");
//             payload.append("image", userData.imageFile); // file attached
//         } else {
//             // Otherwise just send JSON
//             payload = userData;
//         }

//         const response = await backendClient.post('user/', payload, {
//             headers: userData.imageFile ? { "Content-Type": "multipart/form-data" } : {}
//         });

//         return response.data;
//     } catch (err) {
//         console.error("Error in createUser:", err.response?.data || err.message);
//         throw err;
//     }
// }

// export default createUser;





// import backendClient from "./backendClient";

// const createUser = async (userData) => {
//     try {
//         console.log("in createuser", userData)
//         const response = await backendClient.post('user/', userData);
//         console.log("response", response)
//         return response.data;
//     } catch (err) {
//         console.error("Error in createUser:", err.response?.data || err.message);
//         throw err;
//     }
// }

// export default createUser;


// import backendClient from "./backendClient";

// const createUser = async (userData) => {
//     console.log("in createuser", userData)
//     const response = await backendClient.post('user/', userData);
//     console.log("response", response)
//     return response.data;
// }

// export default createUser;
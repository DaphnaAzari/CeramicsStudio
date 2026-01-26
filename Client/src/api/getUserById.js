import backendClient from "./backendClient";

const getUserById = async (id) => {
    // get JWT from storage
    const token = localStorage.getItem("token");

    //const response = await backendClient.get(`/${id}`, {
    const response = await backendClient.get(`/users/${id}`, {

        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
    //return response.data.user;
};

export default getUserById;
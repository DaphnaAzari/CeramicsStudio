import backendClient from "./backendClient";

const getUserById = async (id) => {
    const token = localStorage.getItem("token"); // get JWT from storage

    const response = await backendClient.get(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export default getUserById;

//this ensures that when my UserProfile component fetches data, the backend sees a valid token and allows access.
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

import backendClient from './backendClient';

const getUserById = async (id) => {
    const response = await backendClient.get(`user/${id}`);
    return response.data;
};

export default getUserById;
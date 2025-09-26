import backendClient from './backendClient';

const updateUser = async (id, userData) => {
    const response = await backendClient.put(`user/${id}`, userData);
    return response.data;
};

export default updateUser;

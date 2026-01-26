import backendClient from "./backendClient";

const getProductsByUser = async (userId) => {
    // get JWT from storage
    const token = localStorage.getItem("token");

    const response = await backendClient.get(`/products/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.products; // return only the array of products
};

export default getProductsByUser;



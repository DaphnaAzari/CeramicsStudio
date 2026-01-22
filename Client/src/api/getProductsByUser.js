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



// const API_URL = "http://localhost:3000/products";

// export default async function getProductsByUser(userId) {
//     const res = await fetch(`${API_URL}/user/${userId}`);
//     if (!res.ok) throw new Error("Failed to fetch user products");
//     return res.json();
// }
const API_URL = "http://localhost:3000/products";

export default async function getProductsByUser(userId) {
    const res = await fetch(`${API_URL}/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user products");
    return res.json();
}
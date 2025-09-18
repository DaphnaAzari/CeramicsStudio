import backendClient from "./backendClient";

const createUser = async (userData) => {
    console.log("increateuser")
    const response = await backendClient.post('user/', userData);
    console.log("response", response)
}
export default createUser;
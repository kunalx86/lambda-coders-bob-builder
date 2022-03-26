import Axios from "axios";

export const axios = Axios.create({
    baseURL: "https://localhost:3000/api",
    validateStatus: (status) => status < 300,
});
import axios from "axios";

const api=  axios.create({
    baseURL: "http://localhost:8080",
    headers: {
         "X-Company-Id": "38"
    }
});

export default api;
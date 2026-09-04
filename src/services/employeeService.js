import api from "../api/api";

export const getEmployees= async ()=>{
    const response= await api.get("/employees")
    return response.data;
}
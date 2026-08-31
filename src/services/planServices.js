import axios from "axios";
import api from "../api/api";

export const getPlans= async ()=>{
    const respose= await api.get("/plans");
    return respose.data;
}

export const getPlan=async (id)=>{
    const response =await api.get(`/plans/${id}`);
    return response.data;
}

export const createPlan= async (plan)=>{
    const response= await api.post(`/plans`,plan);
    return response.data;
}

export const updatePlan= async (id,plan)=>{
    const response =await api.put(`/plans/${id}`,plan);
    return response.data;
}

export const deletePlan= async (id)=>{
    const response =await api.delete(`/plans/${id}`);
    return response.data;
}
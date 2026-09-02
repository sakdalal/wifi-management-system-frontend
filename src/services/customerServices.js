import axios from "axios";
import api from "../api/api";


export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await api.post("/customers", customer);
  return response.data;
};

export const updateCustomer = async (id,customer) => {
    const response= await api.put(`/customers/${id}`,customer);
    return response.data;
};

export const deleteCustomer = async (id) => {
    await api.delete(`/customers/${id}`);
};

export const assignPlan= async (customerId,planId)=>{
     const response = await api.put(`/customers/${customerId}/assign-plan/${planId}`,customerId,planId);
    return response.data;
}

export const upgradePlan = async (customerId, planId) => {
    const response = await api.put(
        `/customers/${customerId}/upgrade-plan/${planId}`
    );

    return response.data;
};

export const downgradePlan = async (customerId, planId) => {
    const response = await api.put(
        `/customers/${customerId}/downgrade-plan/${planId}`
    );

    return response.data;
};
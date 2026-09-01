import api from "../api/api";

export const generateBill =async (customerId)=>{
    const response= await api.post(`/bills/generate/${customerId}`);
    return response.data;
}

export const getBills= async ()=>{
    const response =await api.get("/bills");
    return response.data;
}

export const payBill= async (id)=>{
    const response = await api.put(`/bills/pay/${id}`,bill);
    return response.data;
}
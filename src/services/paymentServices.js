import api from "../api/api";

export const getPayments= async()=>{
    const response= api.get("/payments");
    return (await response).data;
}

export const getPayment= async(id)=>{
    const response= await api.get(`/payments/${id}`);
    return response.data;
}

export const payBill= async(billId,paymentData)=>{
    const response= await api.post(`/payments/bill/${billId}`,paymentData);
    return response.data;
}
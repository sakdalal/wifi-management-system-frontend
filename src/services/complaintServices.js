import api from "../api/api";

export const getComplaints =async()=>{
    const response= api.get(`/complaints`);
    return (await response).data;
}

export const getComplaint = async (id) => {
  const response = await api.get(`/complaints/${id}`);
  return response.data;
};

export const createComplaint = async (complaint) => {
  const response = await api.post("/complaints", complaint);
  return response.data;
};

export const updateComplaint = async (id, complaint) => {
  const response = await api.put(`/complaints/${id}`, complaint);
  return response.data;
};

export const deleteComplaint = async (id) => {
  const response = await api.delete(`/complaints/${id}`);
  return response.data;
};

export const assignEmployee = async (id, employeeId) => {
  const response = await api.put(`/complaints/${id}/assign`, {
    employeeId,
  });
  return response.data;
};

export const updateComplaintStatus = async (id, status) => {
  const response = await api.put(`/complaints/${id}/update`, {
    status,
  });
  return response.data;
};

export const getComplaintsByStatus = async (status) => {
  const response = await api.get("/complaints", {
    params: { status },
  });
  return response.data;
};

export const getComplaintDashboardCounts = async () => {
  const response = await api.get("/complaints/dashboard-counts");
  return response.data;
};
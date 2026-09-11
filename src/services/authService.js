import api from "../api/api";

export const login= async (email , password)=>{
    const response= await api.post("/auth/login",{email,password});
    return response.data;
}

export const refreshToken = async (refreshTokenValue) => {
    const response = await api.post("/auth/refresh", {
        refreshToken: refreshTokenValue
    });

    return response.data;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};
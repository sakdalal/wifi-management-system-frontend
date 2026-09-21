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
    try{
     await api.post("/auth/logout");
    } finally {
    localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
    }
};


export const changePassword= async(currentPassword, newPassword, confirmPassword)=>{

    const response= await api.put("/auth/change-password",{currentPassword,newPassword,confirmPassword});
    return response.data;
}

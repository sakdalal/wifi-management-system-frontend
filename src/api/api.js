import axios from "axios";

const api=  axios.create({
    baseURL: "http://localhost:8080"
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};


api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("accessToken");
        const companyId = localStorage.getItem("companyId");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (companyId) {
            config.headers["X-Company-Id"] = companyId;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        // Only handle 401 once
        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        // Don't try refreshing these endpoints
        if (
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/logout")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken =
            localStorage.getItem("refreshToken");

        if (!refreshToken) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            window.location.href = "/login";

            return Promise.reject(error);
        }

        if (isRefreshing) {

            return new Promise((resolve) => {

                addRefreshSubscriber((newAccessToken) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${newAccessToken}`;

                    resolve(api(originalRequest));

                });

            });

        }

        isRefreshing = true;

        try {

            const response = await axios.post(
                "http://localhost:8080/auth/refresh",
                {
                    refreshToken: refreshToken,
                }
            );

            const newAccessToken =
                response.data.accessToken;

            const newRefreshToken =
                response.data.refreshToken;

            const newCompanyId =
               response.data.companyId;

            const newRole=
                response.data.role;

            // Store new tokens
            localStorage.setItem(
                "accessToken",
                newAccessToken
            );

            if (newRefreshToken) {
                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );
            }

            if (newCompanyId) {
                localStorage.setItem(
                    "companyId",
                    newCompanyId
                );
            }

            if(newRole){
                localStorage.setItem(
                    "role",
                    newRole
                );
            }

            api.defaults.headers.common.Authorization =`Bearer ${newAccessToken}`;

            isRefreshing = false;

            onRefreshed(newAccessToken);

            // Retry original request
            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            isRefreshing = false;
            refreshSubscribers = [];

            // Refresh token is invalid/expired
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("companyId");
            localStorage.removeItem("role");

            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    }
);

export default api;
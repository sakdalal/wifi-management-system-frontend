import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Complaints from "../pages/Complaints";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";
import Plans from "../pages/Plans";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CustomerPage from "../pages/Customers/CustomerPage";
import CustomerDetailPage from "../pages/Customers/CustomerDetailPage";
import CustomerEditPage from "../pages/Customers/CustomerEditPage";
import CustomerFormPage from "../pages/Customers/CustomerFormPage";


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route element={<ProtectedRoute/>}>

                    <Route element={<Layout/>}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard/>}
                        />
                        <Route
                            path="/complaints"
                            element={<Complaints/>}
                        />
                        <Route
                            path="/customers"
                            element={<CustomerPage/>}
                        />
                        <Route
                            path="/customers/new"
                            element={<CustomerFormPage/>}
                        />
                        <Route
                            path="/customers/:id"
                            element={<CustomerDetailPage/>}
                        />
                        <Route
                            path="/customers/:id/edit"
                            element={<CustomerEditPage/>}
                        />
                        <Route
                            path="/payments"
                            element={<Payments/>}
                        />
                        <Route
                            path="/plans"
                            element={<Plans/>}
                        />
                        <Route
                            path="/settings"
                            element={<Settings/>}
                        />
                        <Route
                            path="/subscriptions"
                            element={<Subscriptions/>}
                        />

                    </Route>
                </Route>

                <Route
                    path="*"
                    element={<NotFound/>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
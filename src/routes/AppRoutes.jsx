import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/Dashboard/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CustomerPage from "../pages/Customers/CustomerPage";
import CustomerDetailPage from "../pages/Customers/CustomerDetailPage";
import CustomerEditPage from "../pages/Customers/CustomerEditPage";
import CustomerFormPage from "../pages/Customers/CustomerFormPage";
import PlansPage from "../pages/Plans/PlansPage";
import BillPage from "../pages/Bills/BillPage";
import ComplaintPage from "../pages/Complaints/ComplaintPage";
import PaymentsPage from "../pages/Payments/PaymentsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import LoginPage from "../pages/Login/LoginPage";



function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<LoginPage/>}
                />

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
                            element={<ComplaintPage/>}
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
                            element={<PaymentsPage/>}
                        />
                        <Route
                            path="/plans"
                            element={<PlansPage/>}
                        />
                        <Route
                            path="/settings"
                            element={<SettingsPage/>}
                        />
                        <Route
                            path="/bills"
                            element={<BillPage/>}
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
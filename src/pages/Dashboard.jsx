import { useEffect, useState } from "react";
import api from "../api/api";
import { use } from "react";
import KPICard from "../components/dashboard/KPICard.jsx";
import RevenueChart from "../components/dashboard/RevenueChart.jsx";
import CustomerGrowthChart from "../components/dashboard/CustomerGrowthChart.jsx";
import ComplaintChart from "../components/dashboard/ComplaintChart.jsx";
import TopPlans from "../components/dashboard/TopPlans.jsx";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      console.log(response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  if (!dashboardData) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(dashboardData, null, 2)};</pre>

        <div className="kpi-container">
          <KPICard
            title="Total customers"
            value={dashboardData.totalCustomers}
          />

          <KPICard
            title="Monthly Revenue"
            value={`$${dashboardData.totalCustomers}`}
          />

          <KPICard title="New customers" value={dashboardData.newCustomers} />

          <KPICard
            title="Open Complaints"
            value={dashboardData.openComplaints?.OPEN || 0}
          />
        </div>

        <RevenueChart data={dashboardData.monthlyRevenue || []} />
        <CustomerGrowthChart data={dashboardData.customerGrowth || []} />
        <ComplaintChart data={dashboardData.complaintStats || []} />
        <TopPlans data={dashboardData.topPlans || []} />
      </div>
    </div>
  );
}

export default Dashboard;

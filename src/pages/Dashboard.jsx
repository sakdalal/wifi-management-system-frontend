import { useEffect, useState } from "react";
import api from "../api/api";
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  if (!dashboardData) {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>Loading Dashboard.......</h1>

        <div className="kpi-container">
          <div className="kpi-skeleton"></div>
          <div className="kpi-skeleton"></div>
          <div className="kpi-skeleton"></div>
          <div className="kpi-skeleton"></div>
        </div>

        <div className="chart-skeleton"></div>
        <div className="chart-skeleton"></div>
      </div>
    </div>
  );
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

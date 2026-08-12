import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CustomerGrowthChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Customer Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="customerCount" />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerGrowthChart;

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RevenueChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" 
            stroke="#e5e7eb"/>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line  type="monotone"
            dataKey="revenue"
            stroke="#2f67d8"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }} />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;

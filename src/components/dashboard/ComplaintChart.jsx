import { PieChart,Pie,Tooltip,Legend,ResponsiveContainer } from "recharts";

function ComplaintChart({data}){

    const chartData= Object.entries(data||{}).map(
        ([name,value])=>({
            name,value
        })
    );

    return (
        <div className="chart-card">
            <h2>Complaint Status</h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>
                    <Pie  data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}/>
                </PieChart>

                <Tooltip/>
                <Legend/>

            </ResponsiveContainer>

        </div>
    );

}

export default ComplaintChart;
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const DailyRevenueChart = ({ data }) => (

    <div className="chart-card">

        <h3>Daily Revenue</h3>

        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="day"/>

                <YAxis/>

                <Tooltip/>

                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2196F3"
                />

            </LineChart>

        </ResponsiveContainer>

    </div>

);

export default DailyRevenueChart;
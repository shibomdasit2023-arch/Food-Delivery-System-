import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const TopSellingChart = ({ data }) => (

    <div className="chart-card">

        <h3>Top Selling Foods</h3>

        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="name"/>

                <YAxis/>

                <Tooltip/>

                <Bar dataKey="orders" fill="#4CAF50"/>

            </BarChart>

        </ResponsiveContainer>

    </div>

);

export default TopSellingChart;
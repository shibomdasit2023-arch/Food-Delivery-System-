import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const MonthlySalesChart = ({ data }) => {

    return (

        <div className="chart-card">

            <h3>Monthly Sales</h3>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="month"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#ff6347"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default MonthlySalesChart;
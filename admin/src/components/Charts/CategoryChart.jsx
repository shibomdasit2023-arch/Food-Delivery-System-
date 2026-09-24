import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend
} from "recharts";

const CategoryChart = ({ data }) => (

    <div className="chart-card">

        <h3>Category-wise Orders</h3>

        <ResponsiveContainer width="100%" height={300}>

            <PieChart>

                <Pie
                    data={data}
                    dataKey="total"
                    nameKey="category"
                    outerRadius={100}
                    label
                />

                <Tooltip/>

                <Legend/>

            </PieChart>

        </ResponsiveContainer>

    </div>

);

export default CategoryChart;
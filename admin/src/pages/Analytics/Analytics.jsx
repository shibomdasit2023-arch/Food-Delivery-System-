import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";

import MonthlySalesChart from "../../components/Charts/MonthlySalesChart";
import TopSellingChart from "../../components/Charts/TopSellingChart";
import CategoryChart from "../../components/Charts/CategoryChart";
import DailyRevenueChart from "../../components/Charts/DailyRevenueChart";

const Analytics = ({ url }) => {

    const [monthlySales, setMonthlySales] = useState([]);
    const [topFoods, setTopFoods] = useState([]);
    const [categoryOrders, setCategoryOrders] = useState([]);
    const [dailyRevenue, setDailyRevenue] = useState([]);

    const fetchAnalytics = async () => {

        try {

            const [
                monthly,
                top,
                category,
                daily
            ] = await Promise.all([

                axios.get(`${url}/api/analytics/monthly-sales`),

                axios.get(`${url}/api/analytics/top-foods`),

                axios.get(`${url}/api/analytics/category-orders`),

                axios.get(`${url}/api/analytics/daily-revenue`)

            ]);

            setMonthlySales(monthly.data.data);
            setTopFoods(top.data.data);
            setCategoryOrders(category.data.data);
            setDailyRevenue(daily.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchAnalytics();

    }, []);

    return (

        <div className="analytics">

            <h2>Analytics Dashboard</h2>

            <div className="chart-grid">

                <MonthlySalesChart data={monthlySales} />

                <TopSellingChart data={topFoods} />

                <CategoryChart data={categoryOrders} />

                <DailyRevenueChart data={dailyRevenue} />

            </div>

        </div>

    );

};

export default Analytics;
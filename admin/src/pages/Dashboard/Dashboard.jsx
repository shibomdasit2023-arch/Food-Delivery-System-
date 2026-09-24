import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = ({ url }) => {

    const [data, setData] = useState({
        totalOrders: 0,
        totalUsers: 0,
        totalFoods: 0,
        totalRevenue: 0
    });

    const fetchDashboard = async () => {

        try {

            const response = await axios.get(`${url}/api/dashboard`);

            if (response.data.success) {

                setData(response.data.data);

            } else {

                toast.error("Unable to load dashboard");

            }

        } catch (error) {

            console.log(error);

            toast.error("Server Error");

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    return (

        <div className="dashboard">

            <h2>Dashboard</h2>

            <div className="dashboard-cards">

                <div className="card">
                    <div className="icon">📦</div>
                    <div>
                        <h3>Orders</h3>
                        <p>{data.totalOrders}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="icon">👤</div>
                    <div>
                        <h3>Users</h3>
                        <p>{data.totalUsers}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="icon">🍔</div>
                    <div>
                        <h3>Foods</h3>
                        <p>{data.totalFoods}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="icon">💰</div>
                    <div>
                        <h3>Revenue</h3>
                        <p>₹{data.totalRevenue}</p>
                    </div>
                </div>

            </div>

        </div>

    );

};

export default Dashboard;
import orderModel from "../models/orderModel.js";

// Monthly Sales
const getMonthlySales = async (req, res) => {
    try {

        const data = await orderModel.aggregate([
            {
                $match: { payment: true }
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    sales: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        const months = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const result = data.map(item => ({
            month: months[item._id - 1],
            sales: item.sales
        }));

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }
};

// Top Selling Foods
const getTopFoods = async (req, res) => {

    try {

        const data = await orderModel.aggregate([

            {
                $unwind: "$items"
            },

            {
                $group: {

                    _id: "$items.name",

                    orders: {
                        $sum: "$items.quantity"
                    }

                }
            },

            {
                $sort: {
                    orders: -1
                }
            },

            {
                $limit: 10
            }

        ]);

        const result = data.map(item => ({

            name: item._id,

            orders: item.orders

        }));

        res.json({

            success: true,

            data: result

        });

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"

        });

    }

};

// Category-wise Orders
const getCategoryOrders = async (req, res) => {

    try {

        const data = await orderModel.aggregate([

            {
                $unwind: "$items"
            },

            {
                $group: {

                    _id: "$items.category",

                    total: {
                        $sum: "$items.quantity"
                    }

                }
            }

        ]);

        const result = data.map(item => ({

            category: item._id,

            total: item.total

        }));

        res.json({

            success: true,

            data: result

        });

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"

        });

    }

};

// Daily Revenue (Last 30 Days)
const getDailyRevenue = async (req, res) => {

    try {

        const last30 = new Date();

        last30.setDate(last30.getDate() - 30);

        const data = await orderModel.aggregate([

            {
                $match: {

                    payment: true,

                    date: {
                        $gte: last30
                    }

                }
            },

            {
                $group: {

                    _id: {

                        day: {
                            $dayOfMonth: "$date"
                        },

                        month: {
                            $month: "$date"
                        }

                    },

                    revenue: {
                        $sum: "$amount"
                    }

                }
            },

            {
                $sort: {
                    "_id.month": 1,
                    "_id.day": 1
                }
            }

        ]);

        const result = data.map(item => ({

            day: `${item._id.day}/${item._id.month}`,

            revenue: item.revenue

        }));

        res.json({

            success: true,

            data: result

        });

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"

        });

    }

};

export {

    getMonthlySales,

    getTopFoods,

    getCategoryOrders,

    getDailyRevenue

};
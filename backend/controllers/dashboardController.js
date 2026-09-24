import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

const getDashboardData = async (req, res) => {

    try {

        const totalOrders = await orderModel.countDocuments();

        const totalUsers = await userModel.countDocuments();

        const totalFoods = await foodModel.countDocuments();

        const revenue = await orderModel.aggregate([
            {
                $match: {
                    payment: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        res.json({

            success: true,

            data: {

                totalOrders,

                totalUsers,

                totalFoods,

                totalRevenue:
                    revenue.length > 0
                        ? revenue[0].totalRevenue
                        : 0

            }

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

export { getDashboardData };
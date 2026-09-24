import express from "express";

import {

    getMonthlySales,

    getTopFoods,

    getCategoryOrders,

    getDailyRevenue

} from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/monthly-sales", getMonthlySales);

analyticsRouter.get("/top-foods", getTopFoods);

analyticsRouter.get("/category-orders", getCategoryOrders);

analyticsRouter.get("/daily-revenue", getDailyRevenue);

export default analyticsRouter;
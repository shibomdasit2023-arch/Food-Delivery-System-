import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import mongoose from "mongoose"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order from frontend
const placeOrder = async (req,res) =>{


    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, {cartData: {} });

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))


        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


const verifyOrder = async (req,res)=>{
    const {orderId, success} =req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
         res.json({success:false,message:"error"})
    }
}


//user orders for frontend

const userOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({
            userId: req.userId
        });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

}

// Listing orders for admin panel
const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//api for updating order status
const updateStatus = async (req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const searchOrders = async (req, res) => {

    try {

        const keyword = req.query.keyword?.trim();

        if (!keyword) {

            const orders = await orderModel.find({});

            return res.json({
                success: true,
                data: orders
            });

        }

        const query = {

            $or: [

                {
                    "address.firstName": {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    "address.lastName": {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    "address.phone": {
                        $regex: keyword,
                        $options: "i"
                    }
                }

            ]

        };

        // Search by Order ID only if it is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(keyword)) {

            query.$or.push({
                _id: new mongoose.Types.ObjectId(keyword)
            });

        }

        // Search by Date (YYYY-MM-DD)
        const date = new Date(keyword);

        if (!isNaN(date.getTime())) {

            const nextDate = new Date(date);

            nextDate.setDate(nextDate.getDate() + 1);

            query.$or.push({

                date: {

                    $gte: date,

                    $lt: nextDate

                }

            });

        }

        const orders = await orderModel.find(query);

        res.json({

            success: true,

            data: orders

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export {placeOrder, verifyOrder,userOrders,listOrders,updateStatus,searchOrders}

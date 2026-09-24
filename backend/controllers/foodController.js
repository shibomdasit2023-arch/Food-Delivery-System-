import foodModel from "../models/foodModel.js";
import { put, del } from "@vercel/blob";


// ==========================================
// ADD FOOD
// ==========================================

const addFood = async (req, res) => {

    try {

        if (!req.file) {
            return res.json({
                success: false,
                message: "Food image is required"
            });
        }

        // Upload image to Vercel Blob
        const blob = await put(
            `food/${Date.now()}-${req.file.originalname}`,
            req.file.buffer,
            {
                access: "public",
                contentType: req.file.mimetype
            }
        );

        console.log("IMAGE URL:", blob.url);

        const food = new foodModel({

            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,

            rating: Number(req.body.rating),
            type: req.body.type,
            deliveryTime: req.body.deliveryTime,

            image: blob.url
        });

        await food.save();

        res.json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {

        console.log("ADD FOOD ERROR:", error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};


// ==========================================
// LIST FOOD
// ==========================================

const listFood = async (req, res) => {

    try {

        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};


// ==========================================
// GET SINGLE FOOD
// ==========================================

const getFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.params.id);

        if (!food) {

            return res.json({
                success: false,
                message: "Food not found"
            });

        }

        res.json({
            success: true,
            food
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};


// ==========================================
// REMOVE FOOD
// ==========================================

const removeFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.body._id);

        if (!food) {

            return res.json({
                success: false,
                message: "Food not found"
            });

        }

        // Delete image from Vercel Blob
        if (
            food.image &&
            food.image.startsWith("http")
        ) {

            try {

                await del(food.image);

            } catch (deleteError) {

                console.log(
                    "Image delete error:",
                    deleteError
                );

            }

        }

        await foodModel.findByIdAndDelete(
            req.body._id
        );

        res.json({
            success: true,
            message: "Food Removed"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};


// ==========================================
// UPDATE FOOD
// ==========================================

const updateFood = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            rating,
            type,
            deliveryTime
        } = req.body;


        const existingFood =
            await foodModel.findById(req.params.id);


        if (!existingFood) {

            return res.json({
                success: false,
                message: "Food not found"
            });

        }


        const updateData = {

            name,
            description,
            price: Number(price),
            category,
            rating: Number(rating),
            type,
            deliveryTime

        };


        // If a new image was uploaded
        if (req.file) {

            // Upload new image
            const blob = await put(
                `food/${Date.now()}-${req.file.originalname}`,
                req.file.buffer,
                {
                    access: "public",
                    contentType: req.file.mimetype
                }
            );


            updateData.image = blob.url;


            // Delete old Blob image
            if (
                existingFood.image &&
                existingFood.image.startsWith("http")
            ) {

                try {

                    await del(existingFood.image);

                } catch (deleteError) {

                    console.log(
                        "Old image delete error:",
                        deleteError
                    );

                }

            }

        }


        await foodModel.findByIdAndUpdate(
            req.params.id,
            updateData
        );


        res.json({

            success: true,
            message: "Food Updated Successfully"

        });


    } catch (error) {

        console.log("UPDATE FOOD ERROR:", error);

        res.json({

            success: false,
            message: "Error"

        });

    }

};


export {
    addFood,
    listFood,
    removeFood,
    getFood,
    updateFood
};
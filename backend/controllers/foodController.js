import foodModel from "../models/foodModel.js";
import fs from 'fs'


// Add Food Item

const addFood = async (req, res) => {

    try {

        let image_filename = req.file.filename;
        console.log("REQ BODY:", req.body);

        const food = new foodModel({

            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,

            // New Fields
            rating: Number(req.body.rating),
            type: req.body.type,
            deliveryTime:req.body.deliveryTime,

            image: image_filename

        });

        await food.save();

        res.json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

}

// all food list
const listFood = async(req,res) =>{
  try {
    const foods = await foodModel.find({});
    res.json({success:true, data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// Get Single Food

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

}

// remove food

const removeFood = async (req, res) =>{
  try {
    const food = await foodModel.findById(req.body._id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body._id);
    res.json({success:true, message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}


// Update Food

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

        const updateData = {

            name,
            description,
            price: Number(price),
            category,
            rating: Number(rating),
            type,
            deliveryTime

        };

        // Update image only if a new one is uploaded
        if (req.file) {

            updateData.image = req.file.filename;

        }

        await foodModel.findByIdAndUpdate(
            req.params.id,
            updateData
        );

        res.json({

            success: true,

            message: "Food Updated Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"

        });

    }

}


export {addFood, listFood,removeFood, getFood, updateFood}

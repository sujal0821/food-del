import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Add food item
const addFood = async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    let image_filename = `${req.file.filename}`;

    // Create a new food item
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        // Save the new food item to the database
        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.log("Error while adding food:", error);

        // Check for validation errors (if any)
        if (error.name === "ValidationError") {
            return res.status(400).json({ success: false, message: error.message });
        }

        // For other errors, return a generic error message
        res.status(500).json({ success: false, message: "An error occurred while adding food" });
    }
};

// all food list
const listFood = async(req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);

        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove the image file if it exists
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.error("Error while deleting the image file:", err);
                }
            });
        }

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.log("Error while removing food item:", error);
        res.status(500).json({ success: false, message: "An error occurred while removing the food item" });
    }
};


export {addFood,listFood,removeFood};

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { sendOTPEmail } from "../utils/mailer.js";



//login user
const loginUser = async (req,res)=>{
    console.time("Login Time");
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user 
const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email, format and string password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }
        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }
        // hashing user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// Get User Profile

const getProfile = async (req, res) => {

    try {

        const user = await userModel.findById(req.userId).select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};


// Update User Profile

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            street,
            city,
            state,
            country,
            pincode
        } = req.body;

        await userModel.findByIdAndUpdate(req.userId, {

            name,
            phone,
            street,
            city,
            state,
            country,
            pincode

        });

        res.json({
            success: true,
            message: "Profile Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

};

// Change Password

const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        const user = await userModel.findById(req.userId);

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.json({
                success: false,
                message: "Current password is incorrect"
            });

        }

        if (newPassword.length < 8) {

            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        );

        await userModel.findByIdAndUpdate(
            req.userId,
            {
                password: hashedPassword
            }
        );

        res.json({
            success: true,
            message: "Password Changed Successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

}

// Send Forgot Password OTP

const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "Email not registered"
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;

        user.otpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendOTPEmail(email, otp);

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Failed to send OTP"
        });

    }

}

// Verify OTP

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });

        }

        if (!user.otp) {

            return res.json({
                success: false,
                message: "No OTP found. Please request a new OTP."
            });

        }

        if (Date.now() > new Date(user.otpExpiry).getTime()) {

            return res.json({
                success: false,
                message: "OTP has expired"
            });

        }

        if (user.otp !== otp) {

            return res.json({
                success: false,
                message: "Invalid OTP"
            });

        }

        res.json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }

}

// Reset Password

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            otp,
            newPassword
        } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });

        }

        // Check OTP

        if (user.otp !== otp) {

            return res.json({
                success: false,
                message: "Invalid OTP"
            });

        }

        // Check OTP Expiry

        if (Date.now() > new Date(user.otpExpiry).getTime()) {

            return res.json({
                success: false,
                message: "OTP Expired"
            });

        }

        // Validate Password

        if (newPassword.length < 8) {

            return res.json({
                success: false,
                message: "Password must contain at least 8 characters"
            });

        }

        // Hash Password

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        );

        user.password = hashedPassword;

        // Clear OTP

        user.otp = "";

        user.otpExpiry = null;

        await user.save();

        res.json({

            success: true,

            message: "Password Reset Successfully"

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

export {loginUser,registerUser,getProfile,updateProfile, changePassword, sendOTP, verifyOTP, resetPassword};

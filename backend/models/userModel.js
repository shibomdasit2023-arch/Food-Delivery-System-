import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // Shopping Cart
    cartData: {
        type: Object,
        default: {}
    },

    // Profile Details
    phone: {
        type: String,
        default: ""
    },

    street: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: ""
    },

    pincode: {
        type: String,
        default: ""
    },

    profileImage: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    },

    otpExpiry: {
        type: Date,
        default: null
    },

}, {
    minimize: false,
    timestamps: true
});

const userModel =
    mongoose.models.user ||
    mongoose.model("user", userSchema);

export default userModel;
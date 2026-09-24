import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

export const sendOTPEmail = async (email, otp) => {

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Food Delivery System - Password Reset OTP",

        html: `
            <h2>Password Reset Request</h2>

            <p>Your OTP is:</p>

            <h1 style="color:tomato">${otp}</h1>

            <p>This OTP is valid for <b>10 minutes</b>.</p>

            <br>

            <p>If you didn't request this, ignore this email.</p>
        `

    };

    await transporter.sendMail(mailOptions);

};
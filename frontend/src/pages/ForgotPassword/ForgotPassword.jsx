import React, { useState, useContext } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${url}/api/user/send-otp`,
                { email }
            );

            if (response.data.success) {

                toast.success(response.data.message);

                navigate("/reset-password", {
                    state: { email }
                });

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        }

    };

    return (

        <div className="forgot-password">

            <form
                className="forgot-password-container"
                onSubmit={submitHandler}
            >

                <h2>Forgot Password</h2>

                <p>

                    Enter your registered email to receive
                    an OTP.

                </p>

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    required

                />

                <button>

                    Send OTP

                </button>

            </form>

        </div>

    );

};

export default ForgotPassword;
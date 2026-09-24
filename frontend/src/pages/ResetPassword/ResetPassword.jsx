import React, { useContext, useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [data, setData] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onChangeHandler = (e) => {

        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const submitHandler = async (e) => {

        e.preventDefault();

        if (data.newPassword !== data.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const response = await axios.put(

                `${url}/api/user/reset-password`,

                {
                    email,
                    otp: data.otp,
                    newPassword: data.newPassword
                }

            );

            if (response.data.success) {

                toast.success(response.data.message);

                setTimeout(() => {

                    navigate("/");

                }, 1500);

            }

            else {

                toast.error(response.data.message);

            }

        }

        catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        }

    };

    return (

        <div className="reset-password">

            <form
                className="reset-password-container"
                onSubmit={submitHandler}
            >

                <h2>Reset Password</h2>

                <p>

                    OTP has been sent to

                    <br />

                    <strong>{email}</strong>

                </p>

                <input

                    type="text"

                    name="otp"

                    placeholder="Enter OTP"

                    value={data.otp}

                    onChange={onChangeHandler}

                    required

                />

                <input

                    type="password"

                    name="newPassword"

                    placeholder="New Password"

                    value={data.newPassword}

                    onChange={onChangeHandler}

                    required

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={data.confirmPassword}

                    onChange={onChangeHandler}

                    required

                />

                <button>

                    Reset Password

                </button>

            </form>

        </div>

    );

};

export default ResetPassword;
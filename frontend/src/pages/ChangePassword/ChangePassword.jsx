import React, { useContext, useState } from "react";
import "./ChangePassword.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const ChangePassword = () => {

    const { url, token } = useContext(StoreContext);

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onChangeHandler = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const submitHandler = async (e) => {

        e.preventDefault();

        if (data.newPassword !== data.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        const response = await axios.put(

            `${url}/api/user/change-password`,

            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            },

            {
                headers: {
                    token
                }
            }

        );

        if (response.data.success) {

            toast.success(response.data.message);

            setData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } else {

            toast.error(response.data.message);

        }

    };

    return (

        <div className="change-password">

            <form
                onSubmit={submitHandler}
                className="change-password-container"
            >

                <h2>Change Password</h2>

                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={data.currentPassword}
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

                    Update Password

                </button>

            </form>

        </div>

    );

};

export default ChangePassword;
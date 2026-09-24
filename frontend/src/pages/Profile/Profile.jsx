import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Profile = () => {

    const { url, token } = useContext(StoreContext);

    const [editMode, setEditMode] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const loadProfile = async () => {

        try {

            const response = await axios.get(
                `${url}/api/user/profile`,
                {
                    headers: { token }
                }
            );
             console.log("Profile Response:", response.data);


            if (response.data.success) {
                setData(response.data.user);
            }else {
            console.log(response.data.message);
            }

        } catch (error) {
            console.log(error);
        }

    };

    const saveProfile = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `${url}/api/user/profile`,
                data,
                {
                    headers: { token }
                }
            );

            if (response.data.success) {

                toast.success(response.data.message);

                await loadProfile();

                setEditMode(false);

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Error updating profile");
        }

    };

    useEffect(() => {

        if (token) {
            loadProfile();
        }

    }, [token]);
    console.log("Token:", token);

    return (

        <div className="profile">

            <form className="profile-container" onSubmit={saveProfile}>

    <div className="profile-header">

        <div className="profile-avatar">
            {data.name ? data.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2>{data.name}</h2>

        <p>{data.email}</p>

    </div>

    {!editMode ? (

        <>

            <div className="profile-info">

                <div>
                    <strong>📞 Phone</strong>
                    <span>{data.phone || "Not Added"}</span>
                </div>

                <div>
                    <strong>🏠 Street</strong>
                    <span>{data.street || "Not Added"}</span>
                </div>

                <div>
                    <strong>🏙 City</strong>
                    <span>{data.city || "Not Added"}</span>
                </div>

                <div>
                    <strong>🗺 State</strong>
                    <span>{data.state || "Not Added"}</span>
                </div>

                <div>
                    <strong>🌍 Country</strong>
                    <span>{data.country || "Not Added"}</span>
                </div>

                <div>
                    <strong>📮 Pincode</strong>
                    <span>{data.pincode || "Not Added"}</span>
                </div>

            </div>

            <button
                type="button"
                onClick={() => setEditMode(true)}
            >
                ✏ Edit Profile
            </button>

        </>

    ) : (

        <>

            <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Name"
            />

            <input
                type="email"
                value={data.email}
                readOnly
            />

            <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={onChangeHandler}
                placeholder="Phone"
            />

            <input
                type="text"
                name="street"
                value={data.street}
                onChange={onChangeHandler}
                placeholder="Street"
            />

            <input
                type="text"
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                placeholder="City"
            />

            <input
                type="text"
                name="state"
                value={data.state}
                onChange={onChangeHandler}
                placeholder="State"
            />

            <input
                type="text"
                name="country"
                value={data.country}
                onChange={onChangeHandler}
                placeholder="Country"
            />

            <input
                type="text"
                name="pincode"
                value={data.pincode}
                onChange={onChangeHandler}
                placeholder="Pincode"
            />

            <div className="profile-buttons">

                <button type="submit">
                    💾 Save Changes
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setEditMode(false);
                        loadProfile();
                    }}
                >
                    ❌ Cancel
                </button>

            </div>

        </>

    )}

</form>

        </div>

    );

};

export default Profile;
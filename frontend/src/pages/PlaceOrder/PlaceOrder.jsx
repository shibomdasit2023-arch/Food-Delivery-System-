import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const {
        getTotalCartAmount,
        token,
        food_list,
        cartItems,
        url
    } = useContext(StoreContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Delivery Charge Calculation
    const subtotal = getTotalCartAmount();

    let deliveryFee = 0;

    if (subtotal > 0 && subtotal < 300) {
        deliveryFee = 40;
    } else if (subtotal >= 300 && subtotal < 500) {
        deliveryFee = 20;
    } else if (subtotal >= 500) {
        deliveryFee = 0;
    }

    const total = subtotal + deliveryFee;

    const placeOrder = async (event) => {

        event.preventDefault();

        let orderItems = [];

        food_list.forEach((item) => {

            if (cartItems[item._id] > 0) {

                orderItems.push({
                    ...item,
                    quantity: cartItems[item._id]
                });

            }

        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: total
        };

        let response = await axios.post(
            url + "/api/order/place",
            orderData,
            {
                headers: { token }
            }
        );

        if (response.data.success) {

            const { session_url } = response.data;

            window.location.replace(session_url);

        } else {

            alert("Error placing order.");

        }

    };

    useEffect(() => {

        if (!token) {

            navigate('/cart');

        } else if (subtotal === 0) {

            navigate('/cart');

        }

    }, [token, subtotal, navigate]);

    return (

        <form
            onSubmit={placeOrder}
            className='place-order'
        >

            <div className="place-order-left">

                <p className="title">
                    Delivery Information
                </p>

                <div className="multi-fields">

                    <input
                        required
                        name='firstName'
                        value={data.firstName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='First Name'
                    />

                    <input
                        required
                        name='lastName'
                        value={data.lastName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Last Name'
                    />

                </div>

                <input
                    required
                    name='email'
                    value={data.email}
                    onChange={onChangeHandler}
                    type="email"
                    placeholder='Email Address'
                />

                <input
                    required
                    name='street'
                    value={data.street}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder='Street'
                />

                <div className="multi-fields">

                    <input
                        required
                        name='city'
                        value={data.city}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='City'
                    />

                    <input
                        required
                        name='state'
                        value={data.state}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='State'
                    />

                </div>

                <div className="multi-fields">

                    <input
                        required
                        name='pincode'
                        value={data.pincode}
                        onChange={onChangeHandler}
                        type="number"
                        placeholder='Pin Code'
                    />

                    <input
                        required
                        name='country'
                        value={data.country}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Country'
                    />

                </div>

                <input
                    required
                    name='phone'
                    value={data.phone}
                    onChange={onChangeHandler}
                    type="number"
                    placeholder='Phone'
                />

            </div>

            <div className="place-order-right">

                <div className="cart-total">

                    <h2>Cart Totals</h2>

                    <div>

                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹{subtotal}</p>
                        </div>

                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery Fee</p>

                            <p>
                                {
                                    deliveryFee === 0
                                        ? "FREE"
                                        : `₹${deliveryFee}`
                                }
                            </p>

                        </div>

                        <hr />

                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹{total}</b>
                        </div>

                    </div>

                    <button
                        type='submit'
                        disabled={subtotal === 0}
                    >
                        PROCEED TO PAYMENT
                    </button>

                </div>

            </div>

        </form>

    );

};

export default PlaceOrder;
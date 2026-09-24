import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartAmount,
        url
    } = useContext(StoreContext);

    const navigate = useNavigate();

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

    return (
        <div className='cart'>

            <div className="cart-items">

                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>

                <br />
                <hr />

                {food_list.map((item) => {

                    if (cartItems[item._id] > 0) {

                        return (

                            <div key={item._id}>

                                <div className="cart-items-title cart-items-item">

                                    <img
                                        src={url + "/images/" + item.image}
                                        alt={item.name}
                                    />

                                    <p>{item.name}</p>

                                    <p>₹{item.price}</p>

                                    <p>{cartItems[item._id]}</p>

                                    <p>
                                        ₹{(
                                            item.price *
                                            cartItems[item._id]
                                        ).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() =>
                                            removeFromCart(item._id)
                                        }
                                    >
                                        X
                                    </button>

                                </div>

                                <hr />

                            </div>

                        );

                    }

                    return null;

                })}

            </div>

            <div className="cart-bottom">

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
                        onClick={() => navigate('/order')}
                        disabled={subtotal === 0}
                    >
                        PROCEED TO CHECKOUT
                    </button>

                </div>

                <div className="cart-promocode">

                    <div>

                        <p>Have a promocode? Enter here</p>

                        <div className="cart-promocode-input">

                            <input
                                type="text"
                                placeholder="Enter your code"
                            />

                            <button>
                                APPLY
                            </button>

                        </div>

                    </div>

                    <div
                        style={{
                            marginTop: "20px",
                            padding: "12px",
                            background: "#fff8e1",
                            borderRadius: "8px",
                            fontSize: "14px"
                        }}
                    >
                        <b>Delivery Charge Policy</b>

                        <p>₹0 - ₹299 : ₹40</p>

                        <p>₹300 - ₹499 : ₹20</p>

                        <p>₹500+ : FREE 🎉</p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;
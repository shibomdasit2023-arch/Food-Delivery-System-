import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({
    id,
    name,
    price,
    description,
    image,
    rating,
    type,
    deliveryTime
}) => {

    const {
        cartItems,
        addToCart,
        removeFromCart,
        url
    } = useContext(StoreContext);

    return (
        <div className='food-item'>

            <div className="food-item-img-container">

                <img
                    className='food-item-image'
                    src={url + "/images/" + image}
                    alt={name}
                />

                {/* Rating Badge */}

                <div className="food-rating">
                    ⭐ {rating || 4.5}
                </div>

                {/* Veg / Non-Veg Badge */}

                <div
                    className={
                        type === "Veg"
                            ? "food-type veg"
                            : "food-type nonveg"
                    }
                >
                    {type === "Veg" ? "🥬 Veg" : "🍗 Non-Veg"}
                </div>

                {
                    !cartItems[id]
                        ?
                        <img
                            className='add'
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white}
                            alt=""
                        />
                        :
                        <div className='food-item-counter'>

                            <img
                                onClick={() => removeFromCart(id)}
                                src={assets.remove_icon_red}
                                alt=""
                            />

                            <p>{cartItems[id]}</p>

                            <img
                                onClick={() => addToCart(id)}
                                src={assets.add_icon_green}
                                alt=""
                            />

                        </div>
                }

            </div>

            <div className="food-item-info">

                <p className="food-item-name">
                    {name}
                </p>

                <p className="food-item-desc">
                    {description}
                </p>

                <p className="food-item-delivery">
                    🚚 {deliveryTime}
                </p>
                <p className="food-item-price">
                    ₹{price}
                </p>

            </div>

        </div>
    )
}

export default FoodItem
import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({
    category,
    search,
    sortBy,
    rating,
    vegOnly,
    nonVegOnly,
    price
}) => {

    const { food_list } = useContext(StoreContext);

    console.log(food_list);

    // Filter Foods
    let filteredFoods = food_list.filter((item) => {

    console.log({
        name: item.name,
        rating: item.rating,
        type: item.type
    });
        // Category Filter
        const matchCategory =
            category === "All" || item.category === category;

        // Search Filter
        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase());

        const matchRating =
            rating === 0 || Number(item.rating) >= rating;

        // Price Filter
        const matchPrice =
             Number(item.price) <= Number(price);

            /*
        // Veg Filter
        const matchVeg =
            !vegOnly || item.type === "Veg";

        // Non Veg Filter
        const matchNonVeg =
            !nonVegOnly || item.type === "Non Veg";
*/

        const matchType =
            (!vegOnly && !nonVegOnly) ||
           (vegOnly && item.type === "Veg") ||
           (nonVegOnly && item.type === "Non Veg");


        return (
            matchCategory &&
            matchSearch &&
            matchRating &&
            matchPrice &&
            matchType
        );
    });

    // Sorting
    switch (sortBy) {

        case "priceLow":
            filteredFoods.sort((a, b) => a.price - b.price);
            break;

        case "priceHigh":
            filteredFoods.sort((a, b) => b.price - a.price);
            break;

        case "name":
            filteredFoods.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "rating":
            filteredFoods.sort((a, b) =>
                (b.rating || 0) - (a.rating || 0)
            );
            break;

        default:
            break;
    }

    return (
        <div className="food-display" id="food-display">

            <h2>Top Dishes Near You</h2>
            

            <div className="food-display-list">
                

                {filteredFoods.length > 0 ? (

                    filteredFoods.map((item) => (

                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                            type={item.type}
                            deliveryTime={item.deliveryTime}
                        />

                    ))

                ) : (

                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "40px",
                            color: "#777",
                            fontSize: "20px"
                        }}
                    >
                        🍔 No food found.
                    </div>

                )}

            </div>

        </div>
    );
};

export default FoodDisplay;
import React, { useState } from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = ({ search }) => {

    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    // Advanced Filters
    const [rating, setRating] = useState(0);
    const [vegOnly, setVegOnly] = useState(false);
    const [nonVegOnly, setNonVegOnly] = useState(false);
    const [price, setPrice] = useState(1000);

    return (
        <div>

            <Header />

            <ExploreMenu
                category={category}
                setCategory={setCategory}
            />

            {/* Filter Toolbar */}

            <div className="food-toolbar">

                <div className="toolbar-left">

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Sort By</option>
                        <option value="priceLow">Price: Low → High</option>
                        <option value="priceHigh">Price: High → Low</option>
                        <option value="name">Name: A-Z</option>
                    </select>

                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={0}>All Ratings</option>
                        <option value={4.5}>⭐ 4.5+</option>
                        <option value={4}>⭐ 4+</option>
                        <option value={3}>⭐ 3+</option>
                    </select>

                </div>

                <div className="toolbar-right">

                    <label>
                        <input
                            type="checkbox"
                            checked={vegOnly}
                            onChange={(e) =>
                                setVegOnly(e.target.checked)
                            }
                        />
                        Veg
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={nonVegOnly}
                            onChange={(e) =>
                                setNonVegOnly(e.target.checked)
                            }
                        />
                        Non-Veg
                    </label>

                    <div className="price-filter">

                        <span>₹0</span>

                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={price}
                            onChange={(e) =>
                                setPrice(Number(e.target.value))
                            }
                        />

                        <span>₹{price}</span>

                    </div>

                </div>

            </div>

            {/* Food Display */}

            <FoodDisplay
                category={category}
                search={search}
                sortBy={sortBy}
                rating={rating}
                vegOnly={vegOnly}
                nonVegOnly={nonVegOnly}
                price={price}
            />

            <AppDownload />

        </div>
    );
};

export default Home;
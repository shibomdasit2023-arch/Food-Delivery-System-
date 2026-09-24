import React, { useEffect, useState } from "react";
import "./Edit.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Edit = ({ url }) => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [image, setImage] = useState(false);

    const [data, setData] = useState({

        name: "",
        description: "",
        price: "",
        category: "Salad",
        rating: 4.5,
        type: "Veg",
        deliveryTime: "25-30 min"

    });

    const fetchFood = async () => {

        const response = await axios.get(
            `${url}/api/food/${id}`
        );

        if (response.data.success) {

            setData(response.data.food);

        } else {

            toast.error("Food not found");

        }

    };

    useEffect(() => {

        fetchFood();

    }, []);

    const onChangeHandler = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("rating", data.rating);
        formData.append("type", data.type);
        formData.append("deliveryTime", data.deliveryTime);

        if (image) {

            formData.append("image", image);

        }

        const response = await axios.put(

            `${url}/api/food/update/${id}`,

            formData

        );

        if (response.data.success) {

            toast.success(response.data.message);

            navigate("/list");

        }

        else {

            toast.error("Update Failed");

        }

    };

    return (

        <div className="edit">

            <form
                className="flex-col"
                onSubmit={onSubmitHandler}
            >

                <div className="edit-img-upload flex-col">

                    <p>Food Image</p>

                    <label htmlFor="image">

                        <img

                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : `${url}/images/${data.image}`
                            }

                            alt=""

                        />

                    </label>

                    <input

                        hidden

                        id="image"

                        type="file"

                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }

                    />

                </div>

                <div className="edit-name flex-col">

                    <p>Food Name</p>

                    <input

                        type="text"

                        name="name"

                        value={data.name}

                        onChange={onChangeHandler}

                    />

                </div>

                <div className="edit-description flex-col">

                    <p>Description</p>

                    <textarea

                        rows="6"

                        name="description"

                        value={data.description}

                        onChange={onChangeHandler}

                    />

                </div>

                <div className="edit-row">

                    <div>

                        <p>Category</p>

                        <select

                            name="category"

                            value={data.category}

                            onChange={onChangeHandler}

                        >

                            <option>Salad</option>
                            <option>Rolls</option>
                            <option>Deserts</option>
                            <option>Sandwich</option>
                            <option>Cake</option>
                            <option>Pure Veg</option>
                            <option>Pasta</option>
                            <option>Noodles</option>

                        </select>

                    </div>

                    <div>

                        <p>Price</p>

                        <input

                            type="number"

                            name="price"

                            value={data.price}

                            onChange={onChangeHandler}

                        />

                    </div>

                </div>

                <div className="edit-row">

                    <div>

                        <p>Rating</p>

                        <input

                            type="number"

                            min="1"

                            max="5"

                            step="0.1"

                            name="rating"

                            value={data.rating}

                            onChange={onChangeHandler}

                        />

                    </div>

                    <div>

                        <p>Food Type</p>

                        <select

                            name="type"

                            value={data.type}

                            onChange={onChangeHandler}

                        >

                            <option value="Veg">
                                🥬 Veg
                            </option>

                            <option value="Non Veg">
                                🍗 Non Veg
                            </option>

                        </select>

                    </div>

                </div>

                <div className="edit-name flex-col">

                    <p>Delivery Time</p>

                    <input

                        type="text"

                        name="deliveryTime"

                        value={data.deliveryTime}

                        onChange={onChangeHandler}

                    />

                </div>

                <button className="edit-btn">

                    Update Food

                </button>

            </form>

        </div>

    );

};

export default Edit;
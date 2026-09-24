import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const navigate = useNavigate();

    const fetchList = async () => {

        const response = await axios.get(`${url}/api/food/list`);

        if (response.data.success) {

            setList(response.data.data);

        } else {

            toast.error("Error loading food list");

        }

    };

    const removeFood = async (foodId) => {

        const response = await axios.post(
            `${url}/api/food/remove`,
            { _id: foodId }
        );

        if (response.data.success) {

            toast.success(response.data.message);

            fetchList();

        } else {

            toast.error("Error");

        }

    };

    useEffect(() => {

        fetchList();

    }, []);

    return (

        <div className="list add flex-col">

            <p>All Food List</p>

            <div className="list-table">

                <div className="list-table-format title">

                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Rating</b>
                    <b>Type</b>
                    <b>Action</b>

                </div>

                {list.map((item) => (

                    <div
                        key={item._id}
                        className="list-table-format"
                    >

                        <img
                            src={`${url}/images/${item.image}`}
                            alt=""
                        />

                        <p>{item.name}</p>

                        <p>{item.category}</p>

                        <p>₹{item.price}</p>

                        <p>⭐ {item.rating}</p>

                        <p>
                            {item.type === "Veg"
                                ? "🥬 Veg"
                                : "🍗 Non Veg"}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "8px"
                            }}
                        >

                            <button
                                style={{
                                    background: "#2196F3",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                onClick={() =>
                                    navigate(`/edit/${item._id}`)
                                }
                            >
                                ✏ Edit
                            </button>

                            <button
                                style={{
                                    background: "#f44336",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                onClick={() =>
                                    removeFood(item._id)
                                }
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default List;
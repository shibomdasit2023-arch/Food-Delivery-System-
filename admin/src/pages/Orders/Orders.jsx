import React, { useEffect, useState } from 'react'
import './order.css'
import {toast} from 'react-toastify'
import axios from "axios"
import {assets} from "../../assets/assets"
import generateInvoice from "../../utils/invoiceGenerator";

const Orders = ({url}) => {

  const [orders,setOrders]= useState([]);

  const [search, setSearch] = useState("");

  const fetchAllOrders = async () => {

  try {

    const endpoint = search.trim()
      ? `${url}/api/order/search?keyword=${encodeURIComponent(search)}`
      : `${url}/api/order/list`;

    const response = await axios.get(endpoint);

    if (response.data.success) {

      setOrders(response.data.data);

    } else {

      toast.error("Error");

    }

  } catch (error) {

    console.log(error);

    toast.error("Error");

  }

}

  const statusHandler = async(event, orderId) =>{
   const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[search])




  return (
    <div className='order add'>
       {/* Search Box */}

        <div className="orders-search">

            <input
              type="text"
              placeholder="Search by Name, Order ID, Phone or Date"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (

              <button
                onClick={() => setSearch("")}
                className="clear-btn"
              >
                Clear
              </button>

            )}

</div>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                    if (index===order.items.length-1) {
                      return item.name +" x "+ item.quantity
                    }
                    else{
                      return item.name +" x "+ item.quantity +" , "
                    }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName+ " "+ order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street+" , "}</p>
                <p>{order.address.city+" , "+ order.address.state +", "+order.address.country+", "+order.address.pincode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>₹{order.amount}</p>
            <div
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }}
>

    <select
        onChange={(event) =>
            statusHandler(event, order._id)
        }
        value={order.status}
    >

        <option value="Food Processing">
            Food Processing
        </option>

        <option value="Out For DELiVERY">
            Out For DELiVERY
        </option>

        <option value="Delivered">
            Delivered
        </option>

    </select>

    <button
        onClick={() => generateInvoice(order)}
        style={{
            background: "tomato",
            color: "#fff",
            border: "none",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer"
        }}
    >
        📄 Invoice
    </button>

</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders

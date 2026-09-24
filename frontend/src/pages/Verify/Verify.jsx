import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext} from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {

    try {

        const response = await axios.post(
            url + "/api/order/verify",
            { success, orderId }
        );

        if (response.data.success) {

            toast.success("🎉 Payment Successful!");

            setTimeout(() => {

                navigate("/myorders");

            }, 1500);

        }

        else {

            toast.error("❌ Payment Failed!");

            setTimeout(() => {

                navigate("/");

            }, 1500);

        }

    }

    catch (error) {

        console.log(error);

        toast.error("Something went wrong!");

        navigate("/");

    }

}
    useEffect(()=>{
      console.log("Success:", success);
      console.log("Order ID:", orderId);
        verifyPayment();
    },[])
    
  return (
    <div className="verify">

    <div className="spinner"></div>

    <h2>Verifying Payment...</h2>

    <p>Please wait while we confirm your payment.</p>

</div>
  )
}

export default Verify

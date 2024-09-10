// import { useContext, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { StoreContext } from "../Context/StoreContext";
// import {toast} from "react-toastify"
// import axios from "axios";

// const Verify = () => {

//     const [searchParams, setSearchParams] = useSearchParams();
//     const success = searchParams.get("success");
//     const orderId = searchParams.get("orderId");
//     const {url} = useContext(StoreContext);
//     const navigate = useNavigate();

//     const verifyPayment = async () => {
//         const response = await axios.post(url+"/api/order/verify", {success, orderId});
//         console.log("Verification Response:", response.data);

//         if(response.data.success) {
//             navigate("/myOrders");
//             toast.success("Order Placed Successfully");
//         }
//         else {
//             navigate("/");
//         }
//     }

//     useEffect(() => {
//         verifyPayment();
//     },[]);

//     return (
//         <div className="verify min-h-[60vh] grid">
//             <div className="spinner w-[100px] h-[100px] place-self-center border-8 border-[#bdbdbd] border-t-[#7608f0] rounded-full animate-spin"></div>
//         </div>
//     )
// }

// export default Verify


import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            if (!success || !orderId) {
                toast.error("Invalid payment details.");
                navigate("/");
                return;
            }

            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            console.log("Verification Response:", response.data);

            if (response.data.success) {
                navigate("/myOrders");
                toast.success("Order Placed Successfully");
            } else {
                toast.error("Payment verification failed. Redirecting...");
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Something went wrong. Please try again.");
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [success, orderId]); // Added dependencies to ensure it runs only when needed.

    return (
        <div className="verify min-h-[60vh] grid">
            <div className="spinner w-[100px] h-[100px] place-self-center border-8 border-[#bdbdbd] border-t-[#7608f0] rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;

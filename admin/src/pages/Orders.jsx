import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { assets } from "../assets/assets";

const Orders = ({url}) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url+"/api/order/list");
        if(response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
            
        }
        else {
            toast.error("Error Occured");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url+"/api/order/status", {
            orderId,
            status: event.target.value
        });
        if(response.data.success) {
            await fetchAllOrders();
            toast.success(response.data.message);
        }
    }

    useEffect(() => {
        fetchAllOrders(); 
    },[])
    
    return (
        <div className="order add w-[70%] mt-[50px] text-[#6d6d6d] text-[16px] flex-col" style={{ marginLeft: `max(5vw,25px)` }}>
            <h3 className="font-semibold text-2xl">Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item grid grid-cols-custom3 md:grid-cols-custom2 items-start gap-7 border border-[#7608f0] p-[15px_8px] md:p-5 m-[30px_0px] text-sm text-[#505050]">
                        <img src={assets.parcel_icon} alt="" className="w-[50px] md:w-[100%]"/>
                        <div>
                            <p className="order-item-food font-semibold">
                                {order.items.map((item, index) => {
                                    if(index === order.items.length-1) {
                                        return item.name + " * " + item.quantity;
                                    }
                                    else {
                                        return item.name + " * " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p className="order-item-name font-semibold mt-7 mb-1 ">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div className="order-item-address mb-2">
                                <p>{order.address.street+","}</p>
                                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>

                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>₹ {order.amount}</p>
                        <select onChange={(event) => {statusHandler(event,order._id)}} value={order.status}
                            className="bg-[#dfcef0] border border-[#7608f0] text-xs md:text-sm p-[5px] md:p-2.5 outline-none rounded-md" style={{ width: `max(10vw,120px)`}}
                        >
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders

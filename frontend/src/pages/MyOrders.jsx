import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders m-[50px_0px]">
            <h2 className="font-bold text-2xl">My Orders</h2>
            <div className="container flex flex-col gap-5 mt-7 ">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order grid grid-cols-resmyordersCustom md:grid-cols-myordersCustom items-center gap-x-1.5 md:gap-x-0 gap-7 text-xs md:text-sm p-[10px_20px] text-[#454545] border border-[#4608f0]" >
                            <img src={assets.parcel_icon} alt="" className="w-[50px]"/>
                            <p>
                                {order.items.map((item, index) => {
                                    if(index === order.items.length-1) {
                                        return item.name+" * "+item.quantity
                                    }
                                    else{
                                        return item.name+" * "+item.quantity+", "
                                    }
                                })}
                            </p>
                            <p>₹ {order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p className="flex gap-1">
                                <span className="text-[#7608f0]">&#x25cf;</span> 
                                <b className="font-semibold text-[#454545]">{order.status}</b>
                            </p>
                            <button 
                                onClick={fetchOrders}
                                className="border-none p-[12px_0px] rounded-lg bg-[#b560fb] text-black text-[10px] sm:text-xs md:text-sm font-medium cursor-pointer"
                            >
                                Track Order
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders

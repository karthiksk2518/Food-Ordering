import { useContext, useState } from "react"
import { StoreContext } from "../Context/StoreContext"
import axios from "axios";

const PlaceOrder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if(cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
    
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount()+2,
        }

        let response = await axios.post( url + "/api/order/place", orderData, {headers: {token}})
        if(response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            alert("Order failed");
        }
    }

    return (
        <form onSubmit={placeOrder} className="flex flex-col sm:flex-row justify-between items-start gap-[50px] mt-[100px]">
            <div className="w-[100%] " style={{ maxWidth: 'max(30%, 500px)' }}>
                <p className="text-[30px] font-semibold mb-[50px]">Delivery Information</p>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="First Name" required 
                        name="firstName"
                        onChange = {changeHandler} value = {data.firstName}
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                    <input
                        type="text" placeholder="Last Name" required
                        name="lastName"
                        onChange = {changeHandler} value = {data.lastName} 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                </div>
                <input
                    type="email" placeholder="Email Address" required 
                    name="email"
                    onChange = {changeHandler} value = {data.email}
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                <input
                    type="text" placeholder="Street" required 
                    name="street"
                    onChange = {changeHandler} value = {data.street}
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="City" required
                        name="city"
                        onChange = {changeHandler} value = {data.city}
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                    <input
                        type="text" placeholder="State" required 
                        name="state"
                        onChange = {changeHandler} value = {data.state}
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                </div>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="Zip Code" required 
                        name="zipcode"
                        onChange = {changeHandler} value = {data.zipcode}
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                    <input
                        type="text" placeholder="Country" required 
                        name="country"
                        onChange = {changeHandler} value = {data.country}
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
                </div>
                <input
                    type="text" placeholder="Phone" required 
                    name="phone"
                    onChange = {changeHandler} value = {data.phone} 
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-[#7608f0] "/>
            </div>
            <div className="place-order-right w-[100%]" style={{ maxWidth: 'max(40%, 500px)' }}>
                <div className="cart-total flex flex-1 flex-col gap-5">
                    <h2 className="text-[20px] font-semibold">Cart Total</h2>
                    <div>
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr className="m-[10px_0px]" />
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr className="m-[10px_0px]" />
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button
                        className="border-none text-white bg-[#7608f0] p-[12px_0px] mt-[30px] rounded-[4px] cursor-pointer"
                        style={{ width: 'max(15vw, 200px)' }}
                        type = "submit"
                    >
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder

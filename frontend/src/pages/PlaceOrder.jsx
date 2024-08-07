import { useContext } from "react"
import { StoreContext } from "../Context/StoreContext"

const PlaceOrder = () => {

    const { getTotalCartAmount } = useContext(StoreContext);

    return (
        <form className="flex justify-between items-start gap-[50px] mt-[100px]">
            <div className="w-[100%] " style={{ maxWidth: 'max(30%, 500px)' }}>
                <p className="text-[30px] font-semibold mb-[50px]">Delivery Information</p>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="First Name" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                    <input
                        type="text" placeholder="Last Name" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                </div>
                <input
                    type="email" placeholder="Email Address" required 
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                <input
                    type="text" placeholder="Street" required 
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="City" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                    <input
                        type="text" placeholder="State" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                </div>
                <div className="multi-fields flex gap-2.5">
                    <input
                        type="text" placeholder="Zip Code" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                    <input
                        type="text" placeholder="Country" required 
                        className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
                </div>
                <input
                    type="text" placeholder="Phone" required 
                    className="mb-[15px] w-[100%] p-2.5 border rounded-[4px] outline-orange-500 "/>
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
                        className="border-none text-white bg-orange-500 p-[12px_0px] mt-[30px] rounded-[4px] cursor-pointer"
                        style={{ width: 'max(15vw, 200px)' }}
                    >
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder

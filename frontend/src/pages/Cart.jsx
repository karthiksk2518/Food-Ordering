import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from 'react-hot-toast';

const Cart = ({ setShowLogin }) => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token, rewardSummary, useRewards, setUseRewards, usedRewardPoints } = useContext(StoreContext);
    const navigate = useNavigate();

    const loginVerify = () => {
        if (token) {
            navigate('/order');
        } else {
            setShowLogin(true);
        }
    }

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 20;
    const rewardDiscount = usedRewardPoints; // 1 point = 1 rupee
    const total = subtotal + deliveryFee - rewardDiscount;

    return (
        <div className="cart mt-[100px]">
            <div className="cart-items">
                <div className="grid grid-cols-custom items-center" style={{ fontSize: 'max(1vw, 12px)' }}>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index}>
                                    <div className="cart-items-item m-[10px_0px] text-black grid grid-cols-custom items-center"
                                        style={{ fontSize: 'max(1vw, 12px)' }}
                                    >
                                        <img src={url + "/images/" + item.image} alt=""
                                            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] object-cover rounded-full"
                                        />
                                        <p>{item.name}</p>
                                        <p>₹ {item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p className="ml-[-6px] sm:ml-0">₹ {item.price * cartItems[item._id]}</p>
                                        <MdDeleteForever onClick={() => removeFromCart(item._id)} className="cursor-pointer text-[30px]" />
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="cart-bottom mt-[80px] flex flex-col-reverse sm:flex-row justify-between" style={{ gap: 'max(12vw,20px)' }}>
                <div className="cart-total flex flex-1 flex-col gap-5">
                    <h2 className="text-[20px] font-semibold">Cart Total</h2>
                    <div>
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <p>Subtotal</p>
                            <p>₹ {subtotal}</p>
                        </div>
                        <hr className="m-[10px_0px]" />
                        {usedRewardPoints > 0 && (
                            <>
                                <div className="cart-total-details flex justify-between text-[#555]">
                                    <p>Reward Points</p>
                                    <p>-₹ {usedRewardPoints}</p>
                                </div>
                                <hr className="m-[10px_0px]" />
                            </>
                        )}
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <p>Delivery Fee</p>
                            <p>₹ {deliveryFee}</p>
                        </div>
                        <hr className="m-[10px_0px]" />
                        <div className="cart-total-details flex justify-between text-[#555]">
                            <b>Total</b>
                            <b>₹ {total}</b>
                        </div>
                    </div>
                    <button
                        className="border-none text-white bg-[#7608f0] p-[12px_0px] rounded-[4px] cursor-pointer"
                        style={{ width: 'max(15vw, 200px)' }}
                        onClick={subtotal === 0 ? () => { toast.error("Add Item Into Cart") } : loginVerify}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
                <div className="cart-promocode flex-1 justify-start">
                    <div>
                        <p className="text-[#555]">If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-[4px]">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                className="bg-transparent border-none outline-none pl-2.5"
                            />
                            <button className="p-[12px_5px] bg-black border-none text-white rounded-[4px]" style={{ width: 'max(10vw, 150px)' }}>Submit</button>
                        </div>
                        <div className="cart-reward-checkbox mt-2.5 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="useRewards"
                                checked={useRewards}
                                onChange={() => setUseRewards(!useRewards)}
                                disabled={rewardSummary.remainingPoints === 0}
                            />
                            <label htmlFor="useRewards" className="text-[#555]">
                                Use Reward Points (10% of {rewardSummary.remainingPoints} = {usedRewardPoints} points)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default Cart
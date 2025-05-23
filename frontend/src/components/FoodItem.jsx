import { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import PropTypes from 'prop-types';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className="w-[100%] m-auto rounded-[10px] shadow-md shadow-[#0000005f] transition-all duration-1000 animate-fadeIn hover:scale-105">
            <div className="relative">
                <img className="w-[100%] rounded-t-[10px]" src={url + "/images/" + image} alt="" />
                {!cartItems[id] ? (
                    <img className="absolute w-[35px] bottom-[15px] right-[15px] cursor-pointer rounded-[50%]" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                ) : (
                    <div className="absolute flex items-center bottom-[15px] right-[15px] gap-2.5 p-1.5 rounded-[50px] bg-white">
                        <img className="w-[30px] cursor-pointer" onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img className="w-[30px] cursor-pointer" onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                )}
            </div>
            <div className="p-2">
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[17px] font-semibold">{name}</p>
                    <img className="w-[70px]" src={assets.rating_starts} alt="" />
                </div>
                <p className="text-[#676767] text-[12px]">{description}</p>
                <p className="text-[20px] font-bold my-2.5 mx-0">₹ {price}</p>
            </div>
        </div>
    );
};

FoodItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default FoodItem;
import { useState } from "react"
import { assets } from "../assets/assets"

const FoodItem = ({ id, name, price, description, image }) => {
    
    const [itemCount, setItemCount] = useState(0);

    return (
        <div className="w-[100%] m-auto rounded-[10px] shadow-md shadow-[#0000005f] transition-all duration-1000 animate-fadeIn hover:scale-105">
            <div className="food-item-img-container">
                <img className="w-[100%] rounded-t-[10px]" src={image} alt="" />
            </div>
            <div className="p-2">
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[20px] font-medium">{name}</p>
                    <img className="w-[70px]" src={assets.rating_starts} alt="" />
                </div>
                <p className="text-[#676767] text-[12px]">{description}</p>
                <p className="text-orange-500 text-[20px] font-medium my-2.5 mx-0">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem

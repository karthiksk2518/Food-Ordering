import { menu_list } from "../assets/assets";
import { PropTypes } from 'prop-types';

import './ExploreMenu.css';
const ExploreMenu = ({ category, setCategory }) => {

    return (
        <div className="flex flex-col gap-[20px]" id="explore-menu">
            <h1 className="text-[#262626] text-2xl font-bold">Explore Our Menu</h1>
            <p className="max-w-[100%] text-[14px] lg:text-[16px] text-[#808080]">Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className="flex justify-between items-center gap-[30px] text-center my-5 mx-0 overflow-x-scroll explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index} className="explore-menu-list-item">
                            <img src={item.menu_image} alt="" className={`${category === item.menu_name ? "border-4 border-orange-500 p-0.5" : ""} w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] transition-all duration-200`} />
                            <p className="mt-[10px] text-[#747474] text-responsive cursor-pointer">{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className="my-[10px] mx-0 h-0.5 bg-[#e2e2e2] border-none" />
        </div>
    )
}

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.string.isRequired,
};

export default ExploreMenu

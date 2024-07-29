import { useState } from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
    const [menu, setMenu] = useState("home");

    return (
        <div className="pt-5 flex justify-between items-center">
            <img src={assets.logo} alt="" className="w-[150px] md:w-[140px] sm:w-[120px]" />
            <ul className="flex list-none gap-5 text-[#49557e] text-[18px] md:gap-[20px] md:text-[17px] sm:gap-[15px] sm:text-[16px] sm:hidden">
                <li onClick={() => setMenu("home")} className={`${menu === 'home' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Home
                </li>
                <li onClick={() => setMenu("menu")} className={`${menu === 'menu' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Menu
                </li>
                <li onClick={() => setMenu("mobile-app")} className={`${menu === 'mobile-app' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Mobile-App
                </li>
                <li onClick={() => setMenu("contact us")} className={`${menu === 'contact us' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Contact Us
                </li>
            </ul>
            <div className="flex items-center gap-7 md:gap-[30px] sm:gap-[20px]">
                <img src={assets.search_icon} alt='' className="w-[24px] md:w-[22px] sm:w-[20px]" />
                <div className="relative">
                    <img src={assets.basket_icon} alt='' className="w-[24px] md:w-[22px] sm:w-[20px]" />
                    <div className="absolute min-w-[10px] min-h-[10px] bg-orange-800 rounded-full top-[-8px] right-[-8px]"></div>
                </div>
                <button className="bg-transparent text-[16px] text-[#49557e] border-2 border-solid border-orange-800 p-[10px_30px] rounded-[40px] cursor-pointer hover:bg-[#fff4f2] transition-all duration-300 md:p-[8px_25px] sm:p-[7px_20px] sm:text-[15px]">
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Navbar;

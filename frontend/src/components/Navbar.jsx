import { useState } from 'react';
import { assets } from '../assets/assets';
import './Navbar.css';
import { IoSearch } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {

    const [menu, setMenu] = useState("home");

    return (
        <div className="pt-5 w-[100%] flex justify-between items-center navbar">
            <img src={assets.logo} alt="" className="w-[120px] md:w-[150px] navbar-logo" />
            <ul className="hidden md:flex list-none md:gap-3 lg:gap-5 text-[#49557e] sm:text-[16px] md:text-[18px]">
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
            <div className="flex items-center gap-4 sm:gap-4 md:gap-7">
                <IoSearch className='text-2xl md:text-3xl' />
                <MdShoppingCart className='text-2xl md:text-3xl' />
                <button
                    className='bg-transparent text-[14px] md:text-[16px] text-[#49557e] border-2 border-solid border-orange-800 
                    p-[6px_14px] md:p-[10px_30px] rounded-[40px] cursor-pointer hover:bg-[#fff4f2] transition-all duration-300'
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Navbar

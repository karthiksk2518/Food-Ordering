import { useState } from 'react';
import { assets } from '../assets/assets';
import { IoSearch } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");

    return (
        <div className="pt-5 w-[100%] flex justify-between items-center navbar">
            <img src={assets.logo} alt="" className="w-[120px] md:w-[140px] lg:w-[150px] navbar-logo" />
            <ul className="hidden md:flex list-none md:gap-3 lg:gap-5 text-[#49557e] sm:text-[16px] md:text-[18px]">
                <Link to="/" onClick={() => setMenu("home")} className={`${menu === 'home' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Home
                </Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === 'menu' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Menu
                </a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={`${menu === 'mobile-app' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Mobile-App
                </a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={`${menu === 'contact us' ? 'pb-1 border-b-2 border-[#49557e]' : ''} cursor-pointer`}>
                    Contact Us
                </a>
            </ul>
            <div className="flex items-center gap-4 sm:gap-4 md:gap-7">
                <IoSearch className='text-2xl md:text-3xl lg:text-4xl' />
                <MdShoppingCart className='text-2xl md:text-3xl lg:text-4xl' />
                <button
                    className='bg-transparent text-[14px] md:text-[16px] text-[#49557e] border-2 border-orange-600 
                    p-[7px_20px] md:p-[8px_25px] lg:p-[10px_30px] rounded-[40px] cursor-pointer hover:bg-orange-600 hover:text-white transition-all duration-500'
                    onClick={() => setShowLogin(true)}
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Navbar

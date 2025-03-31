import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { IoSearch } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../Context/StoreContext';
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-hot-toast";
import { PropTypes } from "prop-types";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        toast.success("Logged out successfully");
        navigate("/");
    }

    return (
        <div className="pt-5 w-[100%] flex justify-between items-center navbar">
            <Link to="/"><img src={assets.yb_logo} alt="" className="w-[120px] md:w-[140px] lg:w-[150px] navbar-logo" /></Link>
            <ul className="hidden sm:flex list-none gap-2.5 md:gap-3 lg:gap-5 text-[#49557e] sm:text-[16px] md:text-[18px]">
                <Link to="/" onClick={() => setMenu("home")} className={`${menu === 'home' ? 'pb-1 border-b-2 border-[#7608f0]' : ''} cursor-pointer`}>
                    Home
                </Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === 'menu' ? 'pb-1 border-b-2 border-[#7608f0]' : ''} cursor-pointer`}>
                    Menu
                </a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={`${menu === 'mobile-app' ? 'pb-1 border-b-2 border-[#7608f0]' : ''} cursor-pointer`}>
                    Mobile-App
                </a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={`${menu === 'contact us' ? 'pb-1 border-b-2 border-[#7608f0]' : ''} cursor-pointer`}>
                    Contact Us
                </a>
            </ul>
            <div className="flex items-center gap-4 sm:gap-4 md:gap-7">
                <IoSearch className='text-2xl md:text-3xl lg:text-4xl' />
                <Link to='/cart'><MdShoppingCart className='text-2xl md:text-3xl lg:text-4xl' /></Link>
                {!token ?
                    <button
                        className='bg-transparent text-[14px] md:text-[16px] text-[#49557e] border-2 border-[#7608f0] 
                    p-[7px_20px] md:p-[8px_25px] lg:p-[10px_30px] rounded-[40px] cursor-pointer hover:bg-[#7608f0] hover:text-white transition-all duration-500'
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In
                    </button> :
                    <div className='navbar-profile relative'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown absolute hidden right-0 z-10 flex-col gap-2.5 mt-0.5 bg-[#f6f1fa] p-[12px_25px] border border-[#7608f0] rounded-[4px] outline-[2px] outline-[white]  '>
                            <li onClick={() => navigate("/myOrders")}
                                className='flex justify-center items-center gap-2.5 cursor-pointer hover:text-[#7608f0]'>
                                <IoBagHandleOutline className='w-[25px] h-[30px] text-[#7608f0]'/>
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li className='flex justify-center items-center gap-2.5 cursor-pointer hover:text-[#7608f0]'>
                                <MdOutlineLogout className='w-[25px] h-[30px] text-[#7608f0]'/>
                                <p onClick={logout}>Logout</p>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
} 

Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default Navbar



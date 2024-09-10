import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="sidebar w-[18%] min-h-[100vh] border-2 solid border-[#a9a9a9] border-t-0" style={{ fontSize: `max(1vw,10px)` }} >
            <div className="sidebar-options pt-[50px] pl-[20%] flex flex-col gap-[20px]">
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `sidebar-option flex items-center gap-[12px] border solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] 
                        ${isActive ? 'bg-[#dfcef0] border-[#7608f0]' : ''}`
                    }
                >
                    <img className="w-[40px]" src={assets.add_icon_white} alt="" />
                    <p className="hidden md:block">Add Item</p>
                </NavLink>
                <NavLink
                    to="/list"
                    className={({ isActive }) =>
                        `sidebar-option flex items-center gap-[12px] border solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] 
                        ${isActive ? 'bg-[#dfcef0] border-[#7608f0]' : ''}`
                    }
                >
                    <img className="w-[27px] md:w-[30px] ml-1.5 sm:ml-[5px]" src={assets.order_icon} alt="" />
                    <p className="hidden md:block ml-[5px]">List Item</p>
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `sidebar-option flex items-center gap-[12px] border solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] 
                        ${isActive ? 'bg-[#dfcef0] border-[#7608f0]' : ''}`
                    }
                >
                    <img className="w-[27px] md:w-[30px] ml-1.5 sm:ml-[5px]" src={assets.order_icon} alt="" />
                    <p className="hidden md:block ml-[5px]">Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar

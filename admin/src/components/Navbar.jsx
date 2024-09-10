import { assets } from "../assets/assets.js";

const Navbar = () => {
    return (
        <div className="navbar flex justify-between items-center p-[8px_4%]">
            <img
                src={assets.yb_logo} alt="" 
                className="logo" style = {{ width: `max(10%, 80px)` }}
            />
            <img className="profile w-10  rounded-[50%]" src={assets.profile_img} alt="" />
        </div>
    )
}

export default Navbar

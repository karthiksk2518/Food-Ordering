import { assets } from "../assets/assets";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaInstagram  } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-8 mt-[30px]" id="footer">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20">
                <div className="col-span-2 flex flex-col items-start gap-5">
                    <img src={assets.yb_logo} alt="" className="w-[50%] h-[40%]"/>
                    <p>Thank you for choosing <b>YUMMY BASKET</b>, for delicious meals delivered straight to your door. We are committed to providing fresh, quality food with fast, reliable service.</p>
                    <div className="flex ">
                        <FaFacebook className="w-10 text-[60px] mr-[25px] cursor-pointer"/>
                        <BsTwitterX className="w-10 text-[60px] mr-[25px] cursor-pointer"/>
                        <FaLinkedin className="w-10 text-[60px] mr-[25px] cursor-pointer"/>
                        <FaInstagram className="w-10 text-[60px] mr-[25px] cursor-pointer"/>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-5">
                    <h2 className="text-white text-2xl">COMPANY</h2>
                    <ul>
                        <li className="mb-2.5 cursor-pointer">Home</li>
                        <li className="mb-2.5 cursor-pointer">About Us</li>
                        <li className="mb-2.5 cursor-pointer">Delivery</li>
                        <li className="mb-2.5 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-5">
                    <h2 className="text-white text-2xl">GET IN TOUCH</h2>
                    <ul>
                        <li className="mb-2.5 cursor-pointer">+91-9999999887</li>
                        <li className="mb-2.5 cursor-pointer">yummybasket12@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className="w-[100%] h-0.5 my-5 mx-0 bg-gray-500 border-none"/>
            <p className="text-center">
                &copy; 2024 Yummy Basket - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer

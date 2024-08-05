import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-8 mt-[30px]" id="footer">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20">
                <div className="col-span-2 flex flex-col items-start gap-5">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure tempora repudiandae labore voluptatem. Culpa assumenda sint nostrum vitae! Quo facere libero laborum similique at temporibus veritatis fugiat earum officiis sapiente!</p>
                    <div className="flex ">
                        <img className="w-10 mr-[15px] cursor-pointer" src={assets.facebook_icon} alt="" />
                        <img className="w-10 mr-[15px] cursor-pointer" src={assets.twitter_icon} alt="" />
                        <img className="w-10 mr-[15px] cursor-pointer" src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-5">
                    <h2 className="text-white">COMPANY</h2>
                    <ul>
                        <li className="mb-2.5 cursor-pointer">Home</li>
                        <li className="mb-2.5 cursor-pointer">About Us</li>
                        <li className="mb-2.5 cursor-pointer">Delivery</li>
                        <li className="mb-2.5 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-5">
                    <h2 className="text-white">GET IN TOUCH</h2>
                    <ul>
                        <li className="mb-2.5 cursor-pointer">+91-7566236975</li>
                        <li className="mb-2.5 cursor-pointer">karthikpatidar2518@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className="w-[100%] h-0.5 my-5 mx-0 bg-gray-500 border-none"/>
            <p className="footer-copyright">
                &copy; 2024 Karthik Patidar - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer

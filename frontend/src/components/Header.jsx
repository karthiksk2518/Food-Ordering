import './Header.css';
import header_img from '/src/assets/header_img.png';

const Header = () => {
    return (
        <div className="h-[34vw] my-[20px] md:my-[30px] mx-auto bg-no-repeat bg-contain relative" style={{ backgroundImage: `url(${header_img})`}}>
            <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[65%] md:max-w-[45%] lg:max-w-[50%] bottom-[10%] left-[6vw] fadeIn">
                <h2 className="custom-heading">Order your favourite food here</h2>
                <p className='text-white hidden sm:block sm:text-[1vw]'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button className='header-button border-none text-[#747474] font-medium p-[2vw_4vw] sm:p-[1vw_2.3vw] bg-white rounded-[50px]'>View Menu</button>
            </div>
        </div>
    )
}

export default Header

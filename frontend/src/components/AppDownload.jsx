import { assets } from "../assets/assets";

const AppDownload = () => {
    return (
        <div className="my-auto mx-auto mt-[50px] text-center font-medium text-[20px] md:text-[3vw]" id="app-download">
            <p>For Better Experience Download <br/>Tomato App</p>
            <div className="flex justify-center gap-2.5 md:gap-[2vw] mt-[30px]">
                <img className="w-[120px] md:w-[30vw] max-w-[180px] transition-[0.5s] cursor-pointer" src={assets.play_store} alt=""/>
                <img className="w-[120px] md:w-[30vw] max-w-[180px] transition-[0.5s] cursor-pointer" src={assets.app_store} alt=""/>
            </div>
        </div>
    )
}

export default AppDownload

import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login");

    useEffect(() => {
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#00000090] fixed z-50 fadeIn">
            <form className="login-popup-container w-[90%] sm:w-full flex flex-col gap-5 relative z-10 bg-white rounded-[10px] shadow-xl p-[25px_30px]">
                <div className="login-popup-title flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{currState}</h2>
                    <ImCancelCircle className="cursor-pointer" onClick={() => setShowLogin(false)} />
                </div>

                <div className="login-popup-inputs flex flex-col gap-3">
                    {currState === "Login" ?
                        <></> :
                        <label>Name<sup className="text-red-500">*</sup><br />
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                required
                                className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                            />
                        </label>
                    }
                    <label>Email<sup className="text-red-500">*</sup><br />
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            required
                            className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                        />
                    </label>
                    <label>Password<sup className="text-red-500">*</sup><br />
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            required
                            className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                        />
                    </label>
                </div>

                <button className="border-none bg-orange-500 text-white rounded-[5px] p-2 cursor-pointer">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                <div className="login-popup-condition flex items-center gap-2">
                    <input className="cursor-pointer" type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ?
                    <p>Create a new account?
                        <span
                            onClick={() => setCurrState("Sign Up")}
                            className="text-orange-500 ml-2 cursor-pointer"
                        >
                            Click here
                        </span>
                    </p> :
                    <p>Already have an account?
                        <span
                            onClick={() => setCurrState("Login")}
                            className="text-orange-500 ml-2 cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
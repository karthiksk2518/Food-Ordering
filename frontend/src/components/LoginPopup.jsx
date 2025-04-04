import { useContext, useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import {StoreContext} from "../Context/StoreContext";
import { PropTypes } from "prop-types";
import { toast } from "react-hot-toast";
import axios from "axios";
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(StoreContext );

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl = newUrl + "/api/user/login";
        }
        else {
            newUrl = newUrl + "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            setShowLogin(false); 
        }
        else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#00000090] fixed z-50">
            <form onSubmit={onLogin} className="login-popup-container flex flex-col gap-5 relative z-10 bg-white rounded-[10px] shadow-xl p-[25px_30px]">
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
                                name="name"
                                onChange={changeHandler}
                                value={data.name}
                                placeholder="Enter Your Name"
                                required
                                className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                            />
                        </label>
                    }
                    <label>Email<sup className="text-red-500">*</sup><br />
                        <input
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            value={data.email}
                            placeholder="Enter Your Email"
                            required
                            className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                        />
                    </label>
                    <label>Password<sup className="text-red-500">*</sup><br />
                        <input
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={data.password}
                            placeholder="Enter Your Password"
                            required
                            className="w-full border border-[#c9c9c9] outline-none shadow-md rounded-[5px] p-2"
                        />
                    </label>
                </div>

                <button type="submit" className="border-none bg-[#7608f0] text-white rounded-[5px] p-2 cursor-pointer">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                <div className="login-popup-condition flex items-start gap-2">
                    <input className="cursor-pointer mt-[5px]" type="checkbox" required />
                    By continuing, i agree to the terms of use & privacy policy.
                </div>

                {currState === "Login" ?
                    <p>Create a new account?
                        <span
                            onClick={() => setCurrState("Sign Up")}
                            className="text-[#7608f0] ml-2 cursor-pointer"
                        >
                            Click here
                        </span>
                    </p> :
                    <p>Already have an account?
                        <span
                            onClick={() => setCurrState("Login")}
                            className="text-[#7608f0] ml-2 cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                }
            </form>
        </div>
    )
}

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};
export default LoginPopup
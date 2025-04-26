import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const sessionId = searchParams.get("sessionId");
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        if (success === "true" && !sessionId) {
            toast.error("Invalid session ID");
            navigate("/");
            return;
        }

        try {
            const response = await axios.post(
                url + "/api/order/verify",
                { sessionId, success },
                { headers: { token } }
            );
            console.log("Verification Response:", response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/myorders");
            } else {
                toast.error(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.response?.data?.message || "Failed to verify payment");
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify min-h-[60vh] grid">
            <div className="spinner w-[100px] h-[100px] place-self-center border-8 border-[#bdbdbd] border-t-[#7608f0] rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;
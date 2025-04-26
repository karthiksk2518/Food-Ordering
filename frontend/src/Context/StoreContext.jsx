import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    
    const url = import.meta.env.VITE_API_URL;
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setfood_list] = useState([]);
    const [rewardSummary, setRewardSummary] = useState({
        totalRewardPoints: 0,
        usedPoints: 0,
        remainingPoints: 0
    });
    const [useRewards, setUseRewards] = useState(false);
    const [usedRewardPoints, setUsedRewardPoints] = useState(0);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token) {
            await axios.post(url+"/api/cart/add",{itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token) {
            await axios.post(url+"/api/cart/remove",{itemId}, {headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setfood_list(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    const fetchRewardSummary = async () => {
        if (token) {
            const response = await axios.post(url + "/api/reward/getRewardSummary", {}, { headers: { token } });
            setRewardSummary(response.data.data);
            // Update usedRewardPoints based on useRewards and remainingPoints
            setUsedRewardPoints(useRewards ? Math.floor(response.data.data.remainingPoints * 0.1) : 0);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await fetchRewardSummary();
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (token) {
            fetchRewardSummary();
        }
    }, [token, useRewards]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        rewardSummary,
        useRewards,
        setUseRewards,
        usedRewardPoints
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
};

export default StoreContextProvider
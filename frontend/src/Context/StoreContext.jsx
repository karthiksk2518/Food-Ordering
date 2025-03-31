import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setfood_list] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token) {
            await axios.post(`${API_URL}/api/cart/add`,{itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token) {
            await axios.post(`${API_URL}/api/cart/remove`,{itemId}, {headers:{token}});
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
        const response = await axios.get(`${API_URL}/api/food/list`);
        setfood_list(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${API_URL}/api/cart/get`, {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url : API_URL,
        token,
        setToken
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
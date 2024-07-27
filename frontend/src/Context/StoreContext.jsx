import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { PropTypes } from 'prop-types';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}));
        }
        else {
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

StoreContextProvider.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default StoreContextProvider
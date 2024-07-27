import { createContext } from "react";
import { food_list } from "../assets/assets";
import { PropTypes } from 'prop-types';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    
    const contextValue = {
        food_list
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

StoreContextProvider.propTypes = {
    children : PropTypes.string.isRequired,
};

export default StoreContextProvider
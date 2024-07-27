import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import PropTypes from 'prop-types';
import FoodItem from "./FoodItem";
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext);

    return (
        <div className="mt-[30px]" id="food-display">
            <h2 className="font-bold text-[2vw] md:text-[24px]">Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default FoodDisplay;

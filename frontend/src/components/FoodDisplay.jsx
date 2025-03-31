// import { useContext } from "react";
// import { StoreContext } from "../Context/StoreContext";
// import PropTypes from 'prop-types';
// import FoodItem from "./FoodItem";
// import './FoodDisplay.css';

// const FoodDisplay = ({ category }) => {

//     const { food_list } = useContext(StoreContext);

//     return (
//         <div className="mt-[30px]" id="food-display">
//             <h2 className="font-bold text-[4vw] lg:text-[30px]">Top Dishes Near You</h2>
//             <div className="food-display-list">
//                 {food_list.map((item, index) => {
//                     if (category === "All" || category === item.category) {
//                         return (
//                             <FoodItem
//                                 key={index}
//                                 id={item._id}
//                                 name={item.name}
//                                 description={item.description}
//                                 price={item.price}
//                                 image={item.image}
//                             />
//                         )
//                     }
//                 })}
//             </div>
//         </div>
//     );
// };

// FoodDisplay.propTypes = {
//     category: PropTypes.string.isRequired,
// };

// export default FoodDisplay;



import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import PropTypes from 'prop-types';
import FoodItem from "./FoodItem";
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className="mt-[30px]" id="food-display">
            <h2 className="font-bold text-[4vw] lg:text-[30px]">Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={String(item.price)}
                                image={item.image}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default FoodDisplay;
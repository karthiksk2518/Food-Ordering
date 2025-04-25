import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const Reward = () => {
    const { url, token } = useContext(StoreContext);
    const [rewards, setRewards] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);

    const fetchRewards = async () => {
        try {
            const response = await axios.post(url + "/api/reward/myRewards", {}, { headers: { token } });
            setRewards(response.data.rewards);
            setTotalPoints(response.data.totalPoints);
        } catch (error) {
            console.error("Error fetching rewards:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchRewards();
        }
    }, [token]);

    return (
        <div className="my-orders m-[50px_0px]">
            <h2 className="font-bold text-2xl">My Rewards</h2>
            <h3 className="font-medium text-lg mt-4">Total Points: {totalPoints}</h3>
            <div className="container flex flex-col gap-5 mt-7">
                {rewards.map((reward, index) => {
                    const items = reward.orderId?.items || [];
                    const amount = reward.amount;
                    const points = reward.points;

                    return (
                        <div
                            key={index}
                            className="my-orders-order grid grid-cols-resmyordersCustom md:grid-cols-myordersCustom items-center gap-x-1.5 md:gap-x-0 gap-7 text-xs md:text-sm p-[10px_20px] text-[#454545] border border-[#4608f0]"
                        >
                            <img src={assets.parcel_icon} alt="" className="w-[50px]" />
                            <p>
                                {items.map((item, index) =>
                                    index === items.length - 1
                                        ? item.name + " * " + item.quantity
                                        : item.name + " * " + item.quantity + ", "
                                )}
                            </p>
                            <p>₹ {amount}</p>
                            <p>Items: {items.length}</p>
                            <p className="flex gap-1">
                                <span className="text-[#7608f0]">&#x25cf;</span>
                                <b className="font-semibold text-[#454545]">
                                    {amount < 200
                                        ? "No Reward (Below ₹200)"
                                        : points + " Points Earned"}
                                </b>
                            </p>
                            <div className="border-none p-[12px_0px] rounded-lg bg-[#c7b4f3] text-black text-[10px] sm:text-xs md:text-sm font-medium text-center">
                                {points} Points
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Reward;

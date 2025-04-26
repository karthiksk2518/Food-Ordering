import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const Reward = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [rewardSummary, setRewardSummary] = useState({
        totalRewardPoints: 0,
        usedPoints: 0,
        remainingPoints: 0
    });

    const fetchRewards = async () => {
        const response = await axios.post(url + "/api/reward/userRewards", {}, { headers: { token } });
        setData(response.data.data);
    };

    const fetchRewardSummary = async () => {
        const response = await axios.post(url + "/api/reward/getRewardSummary", {}, { headers: { token } });
        setRewardSummary(response.data.data);
    };

    const getRewardPercentage = (amount) => {
        if (amount < 200) return "0% (No reward for orders below ₹200)";
        if (amount >= 200 && amount <= 500) return "5%";
        return "10%";
    };

    useEffect(() => {
        if (token) {
            fetchRewards();
            fetchRewardSummary();
        }
    }, [token]);

    return (
        <div className="my-orders m-[50px_0px]">
            <h2 className="font-bold text-2xl">My Rewards</h2>
            <div className="reward-summary mt-4 text-lg flex flex-col sm:flex-row gap-2 sm:gap-6">
                <span className="font-medium">Total Points: {rewardSummary.totalRewardPoints}</span>
                <span className="font-medium">Remaining Points: {rewardSummary.remainingPoints}</span>
                <span className="font-medium">Used Points: {rewardSummary.usedPoints}</span>
            </div>
            <div className="container flex flex-col gap-5 mt-7">
                {data.map((reward, index) => {
                    const order = reward.orderId;
                    return (
                        <div key={index} className="my-orders-order grid grid-cols-resmyordersCustom md:grid-cols-myordersCustom items-center gap-x-1.5 md:gap-x-0 gap-7 text-xs md:text-sm p-[10px_20px] text-[#454545] border border-[#4608f0]">
                            <img src={assets.parcel_icon} alt="" className="w-[50px]" />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " * " + item.quantity;
                                    } else {
                                        return item.name + " * " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p>₹ {order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p className="flex gap-1">
                                <span className="text-[#7608f0]">●</span>
                                <b className="font-semibold text-[#454545]">{getRewardPercentage(order.amount)}</b>
                            </p>
                            <button
                                className="border-none p-[12px_0px] rounded-lg bg-[#b560fb] text-black text-[10px] sm:text-xs md:text-sm font-medium cursor-pointer"
                            >
                                Points: {reward.rewardPoints}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Reward;
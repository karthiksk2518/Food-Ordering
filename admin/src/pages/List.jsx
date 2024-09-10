import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const List = ({url}) => {


    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error(response.data.message);
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
        await fetchList();
        if(response.data.success) {
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);


    return (
        <div className="list add w-[70%] mt-[50px] text-[#6d6d6d] text-[16px] flex-col" style={{ marginLeft: `max(5vw,25px)` }}>
            <p>All food list</p>
            <div className="list-table">
                <div className="list-table-format title hidden sm:grid grid-cols-custom1 sm:grid-cols-custom items-center gap-2.5 p-[12px_15px] border solid border-[#cacaca] text-[13px] bg-[#e3dfdf]">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format grid grid-cols-custom1 sm:grid-cols-custom items-center gap-2.5 p-[12px_15px] border solid border-[#cacaca] text-[13px]">
                            <img className="w-[50px]" src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <MdDeleteForever 
                                className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] cursor-pointer" 
                                onClick={() => removeFood(item._id)}    
                            />
                        </div>
                   )
                })}
            </div>
        </div>
    )
}

export default List

import { useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { toast } from "react-hot-toast";

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, formData);

        if(response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            });
            setImage(false);
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="w-[70%] mt-[50px] text-[#6d6d6d] text-[16px]" style={{ marginLeft: `max(5vw,25px)` }}>
            <form className="flex-col gap-5" onSubmit={submitHandler}>
                <div className="flex-col">
                    <p>Upload Image</p>
                    <label className="w-fit" htmlFor="image">
                        {image ? (
                            <div className="border-2 border-[#a9a9a9] rounded-md">
                                <img className="w-[120px] h-[70px] object-cover" src={URL.createObjectURL(image)} alt="Uploaded Preview" />
                            </div>
                        ) : (
                            <div className="w-fit border-2 border-[#a9a9a9] p-[15px_40px] rounded-md">
                                <img className="w-[40px]" src={assets.upload_img} alt="Upload Icon" />
                            </div>
                        )}
                    </label>
                    <input
                        type="file" id="image"
                        hidden required
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                </div>
                <div className="flex-col" style={{ width: `max(40%, 280px)` }}>
                    <p>Product Name</p>
                    <input
                        type="text"
                        value={data.name}
                        name="name"
                        placeholder="Type here"
                        required
                        className="p-2.5 border border-[#a9a9a9] rounded-[4px]"
                        onChange={changeHandler}
                    />
                </div>
                <div className="flex-col" style={{ width: `max(40%, 280px)` }}>
                    <p>Product Description</p>
                    <textarea
                        name="description"
                        value={data.description}
                        rows="4"
                        placeholder="Write content here"
                        required
                        className="p-2.5 border border-[#a9a9a9] rounded-[4px]"
                        onChange={changeHandler}
                    ></textarea>
                </div>
                <div className="flex gap-[30px]">
                    <div className="flex-col">
                        <p>Product Category</p>
                        <select onChange={changeHandler} name="category" className="max-w-[120px] p-[5px]">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Roll</option>
                            <option value="Deserts">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="flex-col">
                        <p>Product Price</p>
                        <input
                            type="Number"
                            value={data.price}
                            name="price"
                            placeholder="₹ 20"
                            className="max-w-[120px] p-[5px]"
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="max-w-[120px] border-none bg-black p-2.5 mt-3 text-white rounded-[4px] cursor-pointer "
                >
                    ADD
                </button>
            </form>
        </div>
    )
}

export default Add

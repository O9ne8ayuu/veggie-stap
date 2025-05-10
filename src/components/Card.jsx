import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Additem } from "../redux/CartSlice";

const Card = ({ name, image, id, price, type }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-[300px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-2 border-green-300">
      <div className="w-[100%] h-[60%] overflow-hidden rounded-lg gap-2">
        <img src={image} alt="" className="object-cover" />
      </div>
      <div className="text-2xl font-semibold">{name}</div>
      <div className="w-full flex justify-between items-center">
        <div className="text-lg font-bold text-green-500">Rs {price}/-</div>
        <div className="flex justify-center gap-2 text-green-500 text-lg font-semibold  ">
          {type === "veg" ? (
            <LuLeafyGreen />
          ) : (
            <GiChickenOven className="text-red-500 " />
          )}
          <span>{type}</span>
        </div>
      </div>
      <button
        onClick={() =>
         { dispatch(
            Additem({ id: id, name: name, price: price, image: image, qty: 1 }));
            toast.success("item added")
           }

        }
        className="w-full p-3 bg-green-500 rounded-lg text-white-700 hover:bg-green-400 transition-all"
      >
        Add to Dish
      </button>
    </div>
  );
};

export default Card;

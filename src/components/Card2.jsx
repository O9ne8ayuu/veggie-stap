import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { DecrementQty, IncrementQty, RemoveItem } from "../redux/CartSlice";

const Card2 = ({ name, id, price, image, qty }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[120px] p-2 shadow-lg flex justify-between">
      <div className=" w-[60%] h-full flex gap-5">
        <div className="w-[60%] h-full overflow-hidden">
          <img className="object-cover rounded-lg" src={image} alt="" />
        </div>
      </div>
      <div className="w-[40%] h-full flex flex-col gap-3">
        <div className="text-lg text-gray-600 font-semibold ">{name}</div>
        <div className="w-[105px] h-[40px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg font-semibold border-2 border-green-400 text-xl ">
          <button  onClick={ () =>qty>1 ? dispatch(DecrementQty(id)):null} className="w-[30%] h-full bg-white flex justify-center items-center  text-green-400 hover:bg-gray-200" >
            -
          </button>
          <span className="w-[40%] h-full bg-slate-200 flex justify-center items-center text-green-400">
          {qty}
          </span>
          <button  onClick={()=> dispatch(IncrementQty(id))} className="w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-200" >
            +
          </button>
        </div>
      </div>
      <div className=" flex flex-col justify-start  items-end gap-6">
        <span className="text-xl text-green-400 font-semibold">
          Rs {price}/-
        </span>
        <RiDeleteBin6Line
          onClick={() => dispatch(RemoveItem(id))}
          className="w-[80px] h-[30px] text-red-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Card2;

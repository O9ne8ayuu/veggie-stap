import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from '../context/UserContext';
import { food_items } from '../food';


const Nav = () => {
  const {input,setInput, cate, setCate, showCart, setShowCart} = useContext(dataContext);
  useEffect(()=>{
     const newlist = food_items.filter((item)=>item.food_name.includes(input))|| items.food_name.toLowercase().includes
     setCate(newlist)
  }, [input])
  const items = useSelector(state=>state.cart)
  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
            <MdFastfood className='w-[30px] h-[30px] text-green-500'/>
        </div>
        <form  onSubmit={(e)=>e.preventDefault()} className='w-[45%] h-[60px] bg-white flex items-center px-5 gap-20px rounded-md shadow-md md:w-[70%]'>
            <IoSearch className='text-green-500 w-[20px] h-[20px] ' />
            <input  onChange={(e)=>setInput(e.target.value)} value={input} className='w-[100%] outline-none text-[16px] md:text-[20px] ' type='text' placeholder='Search Items...'/>
        </form>
        <div  onClick ={()=>{
          setShowCart(true)
        }} className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer'>
            <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]'>{items.length}</span>
            <LuShoppingBag  className='w-[30px] h-[30px] text-green-500'/>
        </div>
    </div>
  )
}

export default Nav;

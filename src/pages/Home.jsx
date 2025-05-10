import React, { useContext, useEffect} from 'react';
import Nav from '../components/Nav';
import { categories} from '../Category';
import Card from '../components/Card';
import { dataContext } from '../context/UserContext';
import { food_items } from '../food';
import { RxCross2 } from 'react-icons/rx';
import Card2 from '../components/Card2';
import { useSelector } from 'react-redux';
const Home = () => {
  const {cate, setCate, input, setInput, showCart, setShowCart}= useContext(dataContext);
  
 const filterCategory = (category) => {
  if(category==="All"){
    setCate(food_items);
  } else{
   const filteredItems = food_items.filter(item => item.food_category === category);
   setCate(filteredItems);
  }
  setInput("");
};

const items = useSelector(state =>state.cart);
const subtotal= items.reduce((total,item)=>total+item.qty*item.price,0);
const deliveryFee=20;
const taxes=  Math.floor(subtotal*0.5/100);
const total= Math.floor(subtotal+deliveryFee+taxes);


useEffect(() => {
  const filtered = food_items.filter(item =>
    item.food_name.toLowerCase().includes(input.toLowerCase())
  );
  setCate(filtered);
}, [input]);

  return (
    <div className=' w-full min-h-screen bg-slate-200 '>
      <Nav />
      {!input ? ( 
      <div className='flex flex-wrap justify-center items-center gap-5 w-full'>
        {categories.map((item) =>{
              return <div key={item.id}
            onClick={()=>filterCategory(item.name)}
             className=' w-[150px] h-[150px] bg-white flex flex-col items-start justify-start text-[20px] font-semibold text-gray-600 rounded-lg  shadow-xl gap-5 p-5 hover:bg-green-300 cursor-pointer transition-all duration-200' >
                {item.icon}
                {item.name}
            </div>
         }
           )
        }
      </div> ) : null}

      <div className='flex flex-wrap w-full gap-5 px-5 justify-center pt-8 pb-8'>
        {cate.length>1 ? (cate.map((item) =>(
          <Card  
          key={item.id}
          name={item.food_name} 
          image={item.food_image} 
          price={item.price} 
          id={item.id} 
          type={item.food_type}
          />
        ))
         ):(
       <div className='text-red-700  text-2xl font-lg  font-bold'>Not Available</div>) }
        
      </div>
      <div className={` w-full md:w-[40vw] flex h-full fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-600 flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className='w-full flex justify-between items-center'>
          <span className='text-green-400 text-[18px] font-semibold '> Order items</span>
          <RxCross2   onClick={()=>setShowCart(false)}  className=' w-[30px] h-[30px]text-green-400 text-[18px] font-semibold cursor:pointer hover:text-white-400 '/>
            </header>
            {items.length> 0 ?  <>
        <div className='w-full mt-8 flex flex-col gap-8 '>
          {items.map((item)=>(
            <Card2 key={item.id} name={item.name}  price={item.price} image={item.image} id={item.id}  qty={item.qty} />
          ))}
        </div>
        <div className='w-full border-t-2 border-gray-400 mt-7 flex flex-col gap-4 p-8 border-b-2'>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
            <span className='text-green-400 font-semibold text-lg'> Rs {subtotal} /-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Delivery fee</span>
            <span className='text-green-400 font-semibold text-lg'> Rs {deliveryFee} /-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
            <span className='text-green-400 font-semibold text-lg'> Rs {taxes} /-</span>
          </div>
        </div>
        <div className='w-full flex justify-between items-center'>
            <span className='text-2xl p-9 text-gray-600 font-semibold'>Total</span>
            <span className='text-green-400 font-semibold text-lg'> Rs {total} /-</span>
          </div>
          <button className='w-[90%] p-3 mt-4  bg-green-500 text-white hover:bg-green-300 transition-all' onClick={()=>{
             toast.success("Order Placed");
          }}>Place Order</button>
          </>:
          <div className='text-center text-2xl text-green-500 font-semibold pt-[20px]'>Empty Cart</div>}
           
      </div>
    </div>
    
  );
};

export default Home;

import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import {BsCartPlus} from 'react-icons/bs'
import styles from '../../styles/styles'
import {IoBagHandleOutline, IoChevronBackCircleOutline} from "react-icons/io5";
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/wishlist';
import { backend_url } from '../../server';
import { addTocart } from '../../redux/actions/cart';


const Wishlist = ({setOpenWishList}) => {
    const {wishlist} = useSelector((state)=> state.wishlist);
    const dispatch = useDispatch();

     const removeFromWishlistHandler = (data) => {
            dispatch(removeFromWishlist(data));
        }

        const addToCartHandler = (data) => {
            const newData ={...data, qty:1};
            dispatch(addTocart(newData));
            setOpenWishList(false);
        }


  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
            {
                wishlist && wishlist.length === 0 ? (
                        <div className="w-full h-screen flex items-center justify-center">
                                                    <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                                        <RxCross1 size={25} className='cursor-pointer' onClick={()=> setOpenWishList(false)}/>
                        
                                                    </div>
                                                    <h5>Wishlist Items is empty!</h5>
                                                </div>
                ) : (
                    <>
                    <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                    <RxCross1 size={25} className='cursor-pointer' onClick={()=>setOpenWishList(false)}/>
                </div>
                {/* item length */}
                <div className={`${styles.noramlFlex} p-4`}>
                    <AiOutlineHeart size={25}/>
                    <h5 className='pl-2 text-[20px] font-[500]'>
                       {wishlist && wishlist.length}
                    </h5>
                </div>

                {/* cart single items */}
                <br />
                <div className='w-full border-t'>
                    {
                        wishlist && wishlist.map((i,index)=>(
                            <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler}/>
                        ))
                    }
                </div>
            </div>
                    </>
                )
            }

          
        </div>

    </div>
  )
}



const CartSingle = ({data,removeFromWishlistHandler,addToCartHandler}) =>{
    const [value,setValue] = useState(1);
    const totalPrice = data.discountPrice*value;

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross1 className='cursor-pointer' onClick={()=>removeFromWishlistHandler(data)}/>
                <img src={`${data.images && data.images[0]?.url}`} alt="" className='w-[80px] h-[80px] ml-2'/>
               
                
                <div className='pl-[5px]'>
                    <h1> {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>
                <div>
                <BsCartPlus size={20} className='cursor-pointer' title='Add to cart' onClick={()=> addToCartHandler(data)}/>
            </div>
            </div>
           
        </div>
    )

}

export default Wishlist;
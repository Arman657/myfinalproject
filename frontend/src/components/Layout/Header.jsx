import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { Link, useLocation } from 'react-router-dom'
import {productData} from "../../static/data"
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import {IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';
import {BiMenuAltLeft} from 'react-icons/bi';
import DropDown from "./DropDown";
import { categoriesData } from '../../static/data';
import Navbar from './Navbar';
import {CgProfile} from "react-icons/cg"
import { useSelector } from 'react-redux'
import { backend_url } from '../../server'
import Cart from '../cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx'

const Header = ({activeHeading}) => {
    const {isAuthenticated,user} = useSelector((state) => state.user);
    const {isSeller} = useSelector((state) => state.seller);
      const { wishlist } = useSelector((state) => state.wishlist);
    const {cart} = useSelector((state)=> state.cart);
     const { allProducts } = useSelector((state) => state.products);
    const [searchTerm,setSearchTerm]=useState("");
    const [searchData,setSearchData]=useState(null);
    const [active,setActive]=useState(false);
    const [dropDown,setDropDown] = useState(false);
    const [openCart,setOpenCart] = useState(false);
    const [openWishList,setOpenWishList] = useState(false);
    const [open,setOpen] = useState(false);



    const handleSearch=(e)=>{
        const term= e.target.value;
        setSearchTerm(term);

        const filteredProducts =allProducts && allProducts.filter((product)=>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
      

    
    };

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 70){
            setActive(true);
        }else{
            setActive(false);
        }
    })

    

   

  return (
        <>
        <div className={`${styles.section}`}>
            <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
                <div>
                    <Link to="/">
                    <img className='h-[50px]' src="clotreelogo3.png" alt="" />
                    </Link>
                </div>
                {/* search box */}
                <div className='w-[50%] relative'>
                    <input type="text" placeholder='Search Product...' value={searchTerm} onChange={handleSearch} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'/>
    
                    <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer'/>
    
                    {
                        searchData && searchData.length !==0 ? (
                            <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                {searchData && searchData.map((i,index)=>{
                                    return (
                                        <Link key={index} to={`/product/${i._id}`} onClick={() => setTimeout(() => window.location.reload(), 10)}>
                                            <div className='w-full flex items-start-py-3'>
                                                <img src={`${i.images[0].url}`} alt="" className='w-[40px] h-[40px] mr-[10px]'/>
    
                                                <h1>{i.name}</h1>
    
                                            </div>
                                        </Link>
                                    )
                                })}
    
                            </div>
                        ): null
                    }
    
                </div>
    
                <div className={`${styles.button}`}>
                    <Link to={`${isSeller ? '/dashboard' : '/shop-create'}`}>
                    <h1 className='text-[#fff] flex items-center'>
                     {isSeller ? "Go Dashboard" : "Become Seller"}    <IoIosArrowForward className="ml-1"/>
                    </h1>
                    </Link>
    
                </div>
    
    
            </div>
    
          
    
        </div>
        <div className={`${active===true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
           <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                {/* category */}
                <div onClick={()=>setDropDown(!dropDown)}>
                    <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
                        <BiMenuAltLeft size={30} className='absolute top-3 left-2'/>
                        <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>
                            All Categories
                        </button>
                        <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={()=>setDropDown(!dropDown)}/>
    
                            {
                                dropDown ? (
                                    <DropDown categoriesData={categoriesData} setDropDown={setDropDown}/>
                                ):null
                            }
    
                    </div>
                    
                </div>
    
                {/* navitems */}
    
                <div className={`${styles.noramlFlex}`}>
                                <Navbar active={activeHeading}/>
    
                    </div>
    
                <div className='flex'>
                    {/* header icons */}
                    <div className={`${styles.noramlFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]' onClick={()=>setOpenWishList(true)}>
                            <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%)'/>
                            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white  font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist.length}</span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]' onClick={()=>setOpenCart(true)}>
                            <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%)'/>
                            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white  font-mono text-[12px] leading-tight text-center'>{cart && cart.length}</span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]'>
                            {isAuthenticated ? (
                                     <Link to="/profile">
                                     <img src={`${user?.avatar?.url}`} alt="" className='w-[35px] h-[35px] rounded-full'/>
                                     </Link>
                            ): (
                                <Link to="/login">
                                <CgProfile size={30} color='rgb(255 255 255 / 83%)'/>
    
                                </Link>
                            )}
                           
                        </div>
                    </div>
                </div>
      
      {/* cart popup */}

      {
        openCart ? (
            <Cart setOpenCart={setOpenCart}/>
        ): null
      }

      {/* wishlist popup */}

      {
        openWishList ? (
            <Wishlist setOpenWishList={setOpenWishList}/>
        ): null
      }
            </div>
           </div>

           {/* mobile header */}

           <div className={`${active===true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[50px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
            <div className='w-full flex items-center justify-between h-[50px]'>
                <div>
                    <BiMenuAltLeft size={40} className='ml-4' onClick={()=>setOpen(true)}/>
                </div>
                <div className=''>
                    <Link to="/">
                        <img src="clotreelogo3.png" alt="" className='cursor-pointer h-[31px]' />
                    </Link>
                </div>
                <div>
                    <div className="relative mr-[20px]" onClick={()=>setOpenCart(true)}>
                        <AiOutlineShoppingCart size={30}/>
                        <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right flex justify-center items-center text-white text-[10px]'>{cart && cart.length}</span>
                    </div>
                </div>
            </div>

            {/* header */}
            {
                open && (
                    <div className={`fixed w-full z-20 h-full top-0 left-0 bg-[#0000005f]`}>
                        <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll'>
                            <div className="w-full justify-between flex pr-3">
                                <div>
                                    <div className='relative mr-[15px]'>
                                        <AiOutlineHeart size={30} className='mt-5 ml-3'/>
                                        <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 flex justify-center items-center text-white text-[10px]'>0</span>
                                    </div>
                                </div>
                                <RxCross1 size={30} className='ml-4 mt-5' onClick={()=>setOpen(false)}/> 
                            </div>

                            <div className='my-8 w-[92%] m-auto h-[40px] relative'>
                                <input type="search" placeholder='Search Product...' className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' value={searchTerm} onChange={handleSearch}/>

                                {
                        searchData && searchData.length !==0 ? (
                            <div className='absolute bg-slate-50 shadow z-[9] p-3 w-full left-0'>
                                {searchData && searchData.map((i,index)=>{
                                    const d=i.name;
    
                                    const Product_name= d.replace(/\s+/g, "-");
                                    return (
                                        <Link key={index} to={`/product/${i._id}`} onClick={() => setTimeout(() => window.location.reload(), 100)}>
                                            <div className='w-full flex items-start-py-3'>
                                                <img src={i.images[0]?.url} alt="" className='w-[50px] h-[50px] mr-2'/>
    
                                                <h1>{i.name.length > 40 ? i.name.slice(0, 40) + "..." : i.name}</h1>
    
                                            </div>
                                        </Link>
                                    )
                                })}
    
                            </div>
                        ): null
                    }
                            </div>

                            <Navbar active={activeHeading}/>

                            {/* <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                <Link to="/shop-create">
                                     <h1 className='text-[#fff] flex items-center'>
                                     Become Seller <IoIosArrowForward className="ml-1"/>
                                    </h1>
                                </Link>
                               
                            </div> */}

                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                    <Link to={`${isSeller ? '/dashboard' : '/shop-create'}`}>
                    <h1 className='text-[#fff] flex items-center'>
                     {isSeller ? "Go Dashboard" : "Become Seller"}    <IoIosArrowForward className="ml-1"/>
                    </h1>
                    </Link>
    
                </div>
                            <br />
                                <br />
                                <br />

                            <div className='flex w-full justify-center'>
                                {
                                    isAuthenticated ? (
                                         <div className='flex justify-center items-center w-[100%] flex-col'>
                                            <Link to="/profile">
                                                <img src={`${user?.avatar?.url}`} alt="" className='w-[90px] h-[90px] rounded-full border-[3px] border-[#0eae88]  '/>
                                              
                                            </Link>
                                            <Link to="/profile">
                                            <h1 className='mt-4 text-[1.5rem]'>{`${user?.name}`}</h1>
                                              
                                            </Link>

                                           
                                        </div>
                                
                                    ) : (
                                       <>
                                            <Link to='/login' className='text-[18px] pr-[10px] text-[#000000b7]'>Login /</Link>
                                            <Link to='/sign-up' className='text-[18px] text-[#000000b7]'>Sign up</Link>
                                       </>
                                    )
                                }
                           
                            </div>

                        </div>
                        
                    
  
     
                    </div>
                )
            }
                {
    openCart ? (
        <Cart setOpenCart={setOpenCart}/>
    ): null
  }
           </div>
        </>
    )
   }

 

   

export default Header
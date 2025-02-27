import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { productData } from '../static/data'
import ProductCard from '../components/Route/ProductCart/ProductCard'
import { useSelector } from 'react-redux'
import Footer from '../components/Layout/Footer'

const BestSellingPage = () => {
    // const [data,setData]=useState([]);

    // useEffect(() => {
    //  const d = productData && productData.sort((a,b)=>b.total_sell - a.total_sell);
    //  setData(d);
    // }, [])

    const [data,setData]=useState([]);
    const {allProducts} = useSelector((state)=> state.products);


    useEffect(()=>{
         // Agar products available hain tabhi sort karo
         if (allProducts && Array.isArray(allProducts)) {
            const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
            setData(sortedData);
        } else {
            // Agar products nahi hain ya empty hain, toh empty array set karo
            setData([]);
        }
    },[allProducts])
    
  return (
    <div>
       <Header activeHeading={2}/>
       <br />
       <br />
       <div className={`${styles.section}`}>
        <div className='grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:gap-[30px] mb-12'>
            {
                data && data.map((i,index)=> <ProductCard data={i} key={index}/>)
            }
            
        </div>
       </div>
            <Footer/>
    </div>
  )
}

export default BestSellingPage
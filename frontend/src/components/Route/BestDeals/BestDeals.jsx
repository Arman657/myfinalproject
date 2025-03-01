import React, { useEffect, useState } from 'react'
import styles from '../../../styles/styles';
import ProductCard from "../ProductCart/ProductCard"
import { useSelector } from 'react-redux';

const BestDeals = () => {
    const [data,setData]=useState([]);
    const {allProducts} = useSelector((state)=> state.products);


    useEffect(()=>{
         // Agar products available hain tabhi sort karo
         if (allProducts && Array.isArray(allProducts)) {
            const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
            const firstFive = sortedData.slice(0, 5); // Top 5 products ko slice kar rahe hain
            setData(firstFive);
        } else {
            // Agar products nahi hain ya empty hain, toh empty array set karo
            setData([]);
        }
    },[allProducts])
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Best Deals</h1>
            </div>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 '>
                {
                    data && data.map((i,index)=>(
                        <ProductCard data={i} key={index}/>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default BestDeals
import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import EventCard from "./EventCard"
import { useSelector } from 'react-redux'

const Events = () => {
  const [data,setData]=useState([]);
  const {allEvents,isLoading} = useSelector((state)=> state.events);

  useEffect(()=>{
    // Agar products available hain tabhi sort karo
    if (allEvents && Array.isArray(allEvents)) {
       const sortedData = [...allEvents].sort((a, b) => b.sold_out - a.sold_out);
       const firstthree = sortedData.slice(0, 3); // Top 5 products ko slice kar rahe hain
       setData(firstthree);
   } else {
       // Agar products nahi hain ya empty hain, toh empty array set karo
       setData([]);
   }
},[allEvents])

  return (
    <div>
   {
    !isLoading && (
      <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
      </div>

      <div className='w-full grid'>
          {/* <EventCard data={allEvents && allEvents[0]}/> */}
          {
                    data && data.map((i,index)=>(
                        <EventCard data={i} key={index}/>
                    ))
          }
      </div>

     
  </div>
    )
   }
</div>
  )
}

export default Events
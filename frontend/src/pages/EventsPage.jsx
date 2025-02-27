import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux';

const EventsPage = () => {
  const {allEvents,isLoading} = useSelector((state)=> state.events);

  return (
    <div>
        <Header activeHeading={4}/>
       { allEvents && allEvents.map((i,index)=> <EventCard active={true}  data={i} key={index}/>)}
        {/* <EventCard active={true} data={allEvents && allEvents[0]}/> */}
    </div>
  )
}

export default EventsPage;
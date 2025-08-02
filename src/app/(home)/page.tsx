"use client"
import React from 'react'
import EventList from './_components/EventList'

const Page = () => {
    console.log("✅ Page component rendered");
  return (
    <div>
         <h1 className="text-xl font-bold">Home Page</h1>
      <EventList />
    </div>
  )
}

export default Page







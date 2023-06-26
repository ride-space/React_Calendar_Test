"use client"

import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Image from 'next/image'

export default function Home() {

  const handleClick = (arg:any) => {
    console.log(arg);
    alert(arg.dateStr)


  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<h1>hello world</h1>
<FullCalendar
  plugins={[ dayGridPlugin,interactionPlugin  ]}
  initialView="dayGridMonth"
  weekends={false}
  events={[
    { title: 'event 1', date: '2019-04-01' },
    { title: 'event 2', date: '2019-04-02' }
  ]}
  dateClick={handleClick}
/>
    </main>
  )
}

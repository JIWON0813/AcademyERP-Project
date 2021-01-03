import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import events from "./events"


export default class DemoApp extends React.Component {
  
  render() {
    return (
      <FullCalendar
        defaultView="timeGridDay"
        headerToolbar= {{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        plugins={[dayGridPlugin, timeGridPlugin,listPlugin]}
        navLinks= {true} 
        nowIndicator= {true}
        weekNumbers= {true}
        weekNumberCalculation= 'ISO'
        editable= {true}
        selectable= {true}
        dayMaxEvents= {true}
        events={events}
      />
    )
  }
}
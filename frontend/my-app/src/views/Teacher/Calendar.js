import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import events from "./events"
import ApiService from "../../ApiService";


class DemoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events:"",
      Edate:"",
      arr:[],
      data:[]
    }
  }

  componentDidMount(){
    this.getApi();
  }

  getApi = () => {
    ApiService.Teacher(4)
      .then(res => {
            console.log(res);
            this.setState({
              Edate : res.data.list
            })
            console.log(this.state.Edate.length);
            for(var i=0;i<this.state.Edate.length;i++) {
              this.state.arr[i] = {
              id: i,
              title: "수강일",
              date: this.state.Edate[i]
            } 
          }
          this.setState({
            data : this.state.arr
          })
          
        console.log(this.state.arr[37]);
        })
        
      .catch(res => console.log(res))
  }



  render() {
    const{data} = this.state;
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
        events={data}
      />)
  }
}
export default DemoApp
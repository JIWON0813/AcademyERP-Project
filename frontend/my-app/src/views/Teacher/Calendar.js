import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import events from "./events"
import ApiService from "../../ApiService";
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'


class DemoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events:"",
      Edate:"",
      no:2,
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
        })
        
      .catch(res => console.log(res))
  }



  render() {
    const{data} = this.state;
    const{no} = this.state;
    return (
      <div>
        <>
          <CRow>
            <CCol>
            <Link to={`/curriculum/${no}`}>
              <CButton block color="primary">교육과정 확인</CButton>
            </Link>
            </CCol>
            <CCol>
            <Link to={`/insertCurriculum/${no}`}>
              <CButton block color="primary">교육과정 입력</CButton>
            </Link>
            </CCol>
            <CCol></CCol>
            <CCol></CCol>
            <CCol></CCol>
          </CRow>
          <CRow></CRow>
        </>
      <br></br>
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
      />
      </div>
      )
  }
}
export default DemoApp
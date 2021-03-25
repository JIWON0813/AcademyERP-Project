import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import Moment from 'moment'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

} from "@material-ui/core";
import {CCol, CFormGroup, CLabel} from '@coreui/react'
import ApiService from "src/ApiService";


class DemoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: "",
            view: false,
            start: "",
            end: "",
            title: ""
        } 
      }
  componentDidMount(){
    ApiService.getCalendar()
        .then(res => {
            console.log(res);
            this.setState({
              events: res.data.list
            })
        })
        .catch(res => console.log(res))
  }
  eventClick=(info)=>{
    this.setState({
      view: true,
      title: info.event.title,
      start: Moment(info.event.start).format('YYYY-MM-DD'),
      end: Moment(info.event.end).format("YYYY-MM-DD")
    });
  }

  handleClose=()=> {
    this.setState({
      view: false
    })
  }

  render() {
    return (
      <div>
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
          weekNumberCalculation= 'ISO'
          editable= {true}
          selectable= {true}
          dayMaxEvents= {true}
          events={this.state.events}
          eventClick={this.eventClick}
          />
          <Dialog open={this.state.view} onClose={this.handleClose}>
            <DialogTitle>{this.state.title}</DialogTitle>
            <DialogContent>          
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="start_date">일정 시작</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <font>{this.state.start}</font>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="end_date">일정 끝</CLabel>
                </CCol>
                <CCol xs="10" md="9">
                  <font>{this.state.end}</font>
                </CCol>
              </CFormGroup> 
            </DialogContent>
  
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
            </DialogActions>
          </Dialog> 
        </div>
        
    )
  }
}
export default DemoApp
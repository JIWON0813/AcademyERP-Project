import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import Moment from "moment"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

} from "@material-ui/core";
import {CCol, CFormGroup, CInput, CLabel} from '@coreui/react'
import ApiService from "src/ApiService";


class DemoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
        open: false,
        open2: false,
        no: "",
        title: "",
        start: "",
        end: "",
        events: "",
        color: ""
    } 
    this.handleClose = this.handleClose.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  eventClick(info) { 
    let {events} = this.state;
    let color;
    for(let i=0;i<events.length;i++){
      if(Number(events[i].id)===Number(info.event.id)){
        color=events[i].color
      }
    }
    this.setState({
      open: true,
      title: info.event.title,
      start: Moment(info.event.start).format('YYYY-MM-DD'),
      end: Moment(info.event.end).format("YYYY-MM-DD"),
      no: info.event.id,
      color: color,
    });
  }

  handleClickOpen() {
    this.setState({
      open2: true,
      title: "",
      start: "",
      end: "",
      no: "",
      color: "",
    })
  }
  
  handleClose() {
    this.setState({
      open: false,
      open2: false
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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

  dayPlusOne(day){
    let tt=Moment(day).format("YYYY-MM-DD");
    let t2=tt.split("-");
    let q=Number(t2[2])+1;
    return t2[0]+"-"+t2[1]+"-"+q
  }

  dateCheck(day1,day2){
    let d1=Moment(day1).format("YYYY-MM-DD");
    let d2=Moment(day2).format("YYYY-MM-DD");
    if(d1<d2) return true;
    return false;
  }

  insert = () => {
    let enddate=this.dayPlusOne(this.state.end);
    let boolean=this.dateCheck(this.state.start,enddate);
    var data ={
      title: this.state.title,
      start: this.state.start,
      end: enddate,
      color: this.state.color
    }
    if(boolean){
      ApiService.postCalendar(data)
      .then(function (response) {
        console.log(response)
        alert("등록완료");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error)
      })
    }else{
      alert("시작 날짜가 끝 날짜 보다 큽니다.")
    }
  }

  delete = () =>{
    var data = {
      title: this.state.title,
      start: this.state.start,
      end: this.state.end,
      color: this.state.color
    }
    ApiService.deleteCalendar(data)
      .then(function (response) {
        console.log(response)
        alert("삭제");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  update = () =>{
    let enddate=this.dayPlusOne(this.state.end);
    let boolean=this.dateCheck(this.state.start,enddate);
    var data = {
      id: this.state.no,
      title: this.state.title,
      start: this.state.start,
      end: enddate,
      color: this.state.color,
    }
    if(boolean){
      ApiService.putCalendar(data)
        .then(function (response) {
          console.log(response)
          alert("등록완료");
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error)
        })
    }else{
      alert("시작 날짜가 끝 날짜 보다 큽니다.")
    }
  }



  render() {
    return (
      <div>
        <div align="right">
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            추가하기
          </Button>
        </div>
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

        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>일정 수정</DialogTitle>
            <DialogContent>          
              <CFormGroup row>
                <CCol xs="12" md="9">
                  <CInput name="title" placeholder="일정" value={this.state.title}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="start_date">일정 시작</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="start_date" name="start" placeholder="일정 시작" value={this.state.start}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="end_date">일정 끝</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="end_date" name="end" placeholder="일정 끝" value={this.state.end}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup> 
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="end_date">색깔 </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="color" id="color" name="color" placeholder="색깔"  value={this.state.color}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
          </DialogContent>
  
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.update}>수정</Button>
            <Button variant="contained" color="primary" onClick={this.delete}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.open2} onClose={this.handleClose}>
            <DialogTitle>일정 추가</DialogTitle>
            <DialogContent>          
              <CFormGroup row>
                <CCol xs="12" md="9">
                  <CInput name="title" placeholder="휴일명" value={this.state.title}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="start_date">일정 시작</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="start_date" name="start" placeholder="일정 시작" value={this.state.start}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="end_date">일정 끝</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="end_date" name="end" placeholder="일정 끝"  value={this.state.end}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup> 
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="end_date">색깔 </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="color" id="color" name="color" placeholder="색깔"  value={this.state.color}
                          onChange={this.handleChange}/>
                </CCol>
              </CFormGroup>
          </DialogContent>
  
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.insert}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
    </div>
        
    )
  }
}
export default DemoApp
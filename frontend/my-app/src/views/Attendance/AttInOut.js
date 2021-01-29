import React, { Component } from "react";
import axios from "axios";
import '../css/table.css';
import {
  CButton,
  CCol,CRow
} from '@coreui/react'
import Moment from "moment"
var session_no=window.sessionStorage.getItem('no');
const style={width: "50%", float: "left"}
const style2={width: "50%", float: "right",textAlign: "right" }
class AttInOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
        today: "",
        date: "",
        time: "",
    }
  }
  componentDidMount() {
    this.today_get();
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    )
    this.timer = setInterval(
      () => this.timeSub(),1000
      )
    
  }
  today_get() {
    axios.get("http://localhost:8080/api2/today?no="+session_no)
    .then(res => {
      console.log(res)
      this.setState({
        today: res.data.today[0]
      })
    }).catch(res => console.log(res))
  }

  componentWillUnmount() {
      clearInterval(this.timerID)
      clearInterval(this.timer)
  }

  tick() {
      this.setState({
          date: Moment(new Date()).format("HH:mm:ss")
      })
  }

  timeSub=() => {
    if(this.state.today){
        let in1=this.countSeconds(this.state.date);
      let in2=this.countSeconds(this.state.today.start_time);
      let result=in1-in2;

      this.setState({
        time: this.secondsCount(result)
      })
    }
  }

  in = () =>{
      axios.post(`http://localhost:8080/api2/in`,{no: session_no})
      .then(res => {
        if(res.data){
          alert("출근되었습니다.");
          window.location.reload(false);
        }else{
          alert("이미 출근되었습니다.");
        }
      })
      .catch(res => console.log(res)) 
  }
  out = () =>{
    axios.get(`http://localhost:8080/api2/out?no=${session_no}`)
    .then(res => {
      if(res.data){
        alert("퇴근되었습니다.");
        window.location.reload(false);
      }else{
        alert("출근을 해주세요!.");
      }
    })
    .catch(res => console.log(res)) 
  }

  secondsCount = (seconds) => {
    var hour, min, sec
    hour = parseInt(seconds/3600);
    min = parseInt((seconds%3600)/60);
    sec = seconds%60;

    if (hour.toString().length==1) hour = "0" + hour;
    if (min.toString().length==1) min = "0" + min;
    if (sec.toString().length==1) sec = "0" + sec;
    return hour + ":" + min + ":" + sec;
  }

  countSeconds = (str) => {
    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return (hour*3600) + (minute*60) + (second);
  }
  night = () =>{
    let today = new Date();
    let hours = today.getHours(); 
    let minutes = today.getMinutes();  
    let seconds = today.getSeconds();  
    let night = "18:00:00";

    if(this.countSeconds(hours+':'+minutes+':'+seconds)>this.countSeconds(night)){ 
      axios.get(`http://localhost:8083/api2/night?no=${session_no}`)
      .then(res => {
        if(res.data){
          alert("연장근무후 퇴근을 해주세요.");
          window.location.reload(false);
        }else{
          alert("출근을 해주세요!.");
        }
      })
      .catch(res => console.log(res)) 
    }else{
      alert("연장근무는 "+night+"이후에 가능합니다.")
    }
  }

  render() {
    const { today } = this.state;
    return (
      <div>
        <div style={style}>
          <CRow className="align-items-center">
                <CCol col="3" sm="3" md="2" xl className="mb-3 mb-xl-0">
                  <CButton block variant="outline" color="info" onClick={this.in}>출근</CButton>
                </CCol>

                <CCol col="3" sm="3" md="2" xl className="mb-3 mb-xl-0">
                  <CButton block variant="outline" color="info" onClick={this.out}>퇴근</CButton>
                </CCol>

                <CCol col="3" sm="3" md="2" xl className="mb-3 mb-xl-0">
                  <CButton block variant="outline" color="info" onClick={this.night}>연장</CButton>
                </CCol>
          </CRow>
        </div>
        <div style={style2}>
          <div>현재 시간 :{this.state.date}</div>
          {today !== undefined ?
            <div>
              <div>출근 시간 :{this.state.today.start_time}</div>
              <div>퇴근 시간 :{this.state.today.end_time}</div>
              <div>
                {this.state.today.end_time === null ?
                  <div>{this.state.today.end_time}현재 근무한 시간 :{this.state.time}</div> :
                  <div>(퇴근)근무한 시간 :{this.secondsCount(this.countSeconds(this.state.today.end_time)-
                                          this.countSeconds(this.state.today.start_time))}</div> 
                }
            </div></div>
            :""
          }
        </div>
      </div>
    );
  }
}

export default AttInOut;

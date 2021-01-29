import React, { Component,useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {CPagination} from '@coreui/react'
import listPlugin from '@fullcalendar/list';
import '../css/table.css';
import Moment from "moment"
import CIcon from '@coreui/icons-react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {CCol, CFormGroup, CLabel} from '@coreui/react'

import {
  CButton,
  CRow,CInput
} from '@coreui/react'
var session_no=window.sessionStorage.getItem('no');
const _default=0,_Chart=3;

class AttTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: "",
        depList: "",
        q: [1],
        date: new Date(),
        day: '',
        today: Moment().format('YYYY-MM-DD'), //i
        name: '',
        dep: '',
        start: '',
        end: '',
        cyear: '',
        mode: this.props.mode,
        loopCheck: true,
        page: '',
        events: [],
        view: false,
        fir: true,
        page2:""
    }
    this.dayChange = this.dayChange.bind(this);
    this.dateDay = this.dateDay.bind(this); 
    this.DayReset = this.DayReset.bind(this); 
  }
  componentDidMount() {
    this.getApi();
  }
  DayToSETime(value){
    var getDay=this.dateDay(value)
    var start=Moment(value).add(getDay*-1,'days').format("YYYY-MM-DD")
    var end=Moment(start).add(6,'days').format("YYYY-MM-DD")
    this.setState({
      start: start,
      end: end
    })
    return({start: start,end: end})
  }
  timemap(time){          //일간 처음 빈공간을 구해줌
    var arr=[];
    var temp = new Date("2020-11-11 "+time)
    var temp2=(Moment(temp).format("HH"))*6
    var mit=Moment(temp).format("mm")/10+temp2
    for (var index = 30; index < mit; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap2(in_time1,in_time2){ //일간 색깔 공간을 구해줌
    var arr=[];
    var time1 = new Date("2020-11-11 "+in_time1)
    var time2 = new Date("2020-11-11 "+in_time2)
    var sh=Moment(time1).format("HH")
    var eh=Moment(time2).format("HH")
    var sm=Moment(time1).format("mm")
    var em=Moment(time2).format("mm")
    var hh=(eh-sh)*6
    var rm=(em-sm)/10
    var sum=hh+rm
    for (var index = 3; index < sum; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap3(time1,time2){      //1,2채우고 나머지공간을 구해줌
    var arr=[];
    var timesum=this.timemap(time1).length+this.timemap2(time1,time2).length;
    for (var index = 0; index < 116-timesum; index++) {
      arr.push(index)
    }
    return arr;
  }
  dateDay(day){     //입력받은 날짜의 요일을 구해줌
    return new Date(day).getDay();
  }
  countSeconds = (str) => {     //HH:MM:SS=>cenond
    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return (hour*3600) + (minute*60) + (second);
  }
  reseconds = (seconds) => {    //cenond=>HH:MM:SS
    var hour = parseInt(seconds/3600);
    var min = parseInt((seconds%3600)/60);
    var sec = seconds%60;
    
    return this.septo(hour)+':'+this.septo(min)+':'+this.septo(sec)
  }
  septo = (tt) =>{            //한자릿수를 두자리수로
    if(tt<10){
      tt='0'+tt;
    }
    return tt;
  }
  subsec = (sec1,sec2) =>{        //시간을 빼는 함수
    var result;
    if(sec1===0 || sec2===0){
      result=0;
    }else{
      result=sec1-sec2;
    }
    return result;
  }

  dayChange = (e) => {        //day변경 
    const {page}=this.state;
    this.setState({
      day: e.target.value,
      loopCheck: true
    })
    this.DayToSETime(e.target.value);
    axios({
      method:'get',
      url:encodeURI('http://localhost:8080/api2/attgetno/'+1+'/'+page.cntPerPage+'?day='+e.target.value+'&name='+session_no+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
          ItemList: res.data.list,
          page: res.data.page
        })
      }).catch(res => console.log(res))
  }

  DayReset(){
    var day=document.getElementsByClassName("day")
    for(var i=0;i<day.length;i++){
      day[i].value="";
    }
    this.setState({
      day: '',
      loopCheck: true
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8080/api2/attgetno/'+1+'/'+10+'?day=&name='+session_no+'&dep='),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({ 
          ItemList: res.data.list,
          page: res.data.page
        })
      }).catch(res => console.log(res))
  }

  getApi = () => {
    axios({
      method:'get',
      url:encodeURI('http://localhost:8080/api2/attgetno/'+1+'/'+10+'?day=&name='+session_no+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({ 
          ItemList: res.data.list,
          page: res.data.page
        })
      }).catch(res => console.log(res))
  }
  selChange() { //몇줄로 볼지 
    var sel = document.getElementById('cntPerPage').value;
    this.movePage(1,sel)
  }
  pageChange(selPage){ //페이지 이동 클릭
    const {page}=this.state;
    this.movePage(selPage,page.cntPerPage)
  }
  nextpage(){ //다음 페이지
    const {page}=this.state;
    this.movePage(page.endPage+1,page.cntPerPage)
  }
  prevpage(){ //이전 페이지
    const {page}=this.state;
    this.movePage(page.startPage-1,page.cntPerPage)
  }
  movePage(nowpage,perpage){ //페이지 이동
    var add
    if(this.state.day.length > 0){
      add="http://localhost:8080/api2/attgetno/"+nowpage+"/"+perpage+"?day="+this.state.day
    +"&name="+session_no+"&dep="+this.state.dep
    }else{
      add="http://localhost:8080/api2/attgetno/"+nowpage+"/"+perpage+'?day=&name='+session_no+'&dep='+this.state.dep
    }
    axios.get(add)
        .then(res => {
            console.log(res);
            this.setState({
              ItemList: res.data.list,
              page: res.data.page
            })
        })
        .catch(res => console.log(res))
  }
  makeMap(start,end){ //배열 만드는 함수
    var result=[];
    for(var i=start;i<=end;i++){
      result.push(i);
    }
    return result;
  }

  getCalendar=()=>{
    axios({
      method:'get',
      url:encodeURI('http://localhost:8080/api2/attgetno/'+1+'/'+10000000+'?day=&name='+session_no+'&dep='),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({ 
          events: this.data__event(res.data.list)
        })
      }).catch(res => console.log(res))
  }

  data__event(data){
    let events = [];

    for(var i=0;i<data.length;i++){
      if(data[i].end_time===null) data[i].end_time="ing";
      let temp={
        id: data[i].no,
        title: data[i].start_time+"~"+data[i].end_time,
        date: data[i].day,
        color: "#FF5675"
      };
      events.push(temp)
    }
    return events;
  }

  eventClick=(info)=>{
    this.setState({
      view: true,
      title: info.event.title,
      start: Moment(info.event.start).format('YYYY-MM-DD').split("-"),
      end: Moment(info.event.end).format("YYYY-MM-DD")
    });
  }

  handleClose=()=> {
    this.setState({
      view: false
    })
  }

  chage=(event)=>{
    this.setState({
      page2: event
    })
  }

  render() {
    const { ItemList } = this.state;
    const { page } = this.state;
    const style={width: "35%"};
    if(this.props.mode===_Chart){
      if(this.state.fir){
        this.getCalendar();
        this.setState({
          fir:false
        })
      }
    }
  
    return (
      <div>
        {this.props.mode===_default &&
          <div>
            <div style={style}>
            <CRow className="align-items-center">
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CInput type="date" value={this.state.day} onChange={this.dayChange}  id="date-input" name="date-input" placeholder="date" />
              </CCol>
                
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CButton block variant="outline" color="success" onClick={() =>{this.DayReset()}}>날짜 초기화</CButton>
              </CCol>
            </CRow>
            <br/>
            </div>
            <div style={{float: "right"}}>
              <select id="cntPerPage" name="sel" onChange={() => {this.selChange()}}>
                <option value="5">5줄 보기</option>
                <option value="10" selected="selected">10줄 보기</option>
                <option value="15">15줄 보기</option>
                <option value="20">20줄 보기</option>
              </select>
            </div>
            <table name="ATT" class="default">
            <thead>
              <tr class="default">
                <td class="default">NO</td><td class="default">근무일자</td>
                <td class="default">이름</td><td class="default">출근시간</td>
                <td class="default">퇴근시간</td><td class="default">출근구분</td><td class="default">퇴근구분</td>
                <td class="default">연장근무시간</td><td class="default">총근무시간</td>
              </tr>
            </thead>
            <tbody>
            {ItemList&&ItemList.map((att) => {
              var bool = "정상"
              var bool2 = "정상"
              var time = "09:00:00"
              var time2 = "17:00:00"
              if(this.countSeconds(time)<this.countSeconds(att.start_time)){
                bool = "지각"
              }
              if(att.end_time==null){
                bool2 = ""
              }else if(this.countSeconds(att.end_time)<this.countSeconds(time2)){
                bool2 = "조퇴"
              }else if(att.night){
                bool2 = "연장"
              }
              return (
              <tr class="default">
                  <td class="default">{att.no}</td>
                  <td class="default">{att.day}</td>
                  <td class="default">{att.name}</td>
                  <td class="default">{att.start_time}</td>
                  <td class="default">{att.end_time}</td>
                  <td class="default">{bool}</td>
                  <td class="default">{bool2}</td>
                  <td class="default">{att.night === 1 && this.reseconds(this.subsec(this.countSeconds(att.end_time),this.countSeconds(time2)))}</td>
                  <td class="default">{this.reseconds(this.subsec(this.countSeconds(att.end_time),this.countSeconds(att.start_time)))}</td>
                </tr>
              );
            })}
            </tbody> 
          </table>
            {ItemList.length===0&&
                <div align="center">
                  <h2>내용이 없습니다</h2>
                  <hr></hr>
                </div>
            }
        
            <br/>
            <nav aria-label="pagination">
              <ul class="pagination justify-content-center">
                {page.startPage !== 1 ? 
                  <li onClick={() => this.prevpage()} class="page-item disabled"><a class="disabled page-link" aria-label="Go to previous page" aria-disabled="true">‹</a></li> : ""} {/*이전 */}
                {this.makeMap(page.startPage,page.endPage).map((i) => {
                  if(page.nowPage===i){
                    return(<li class="active page-item"><a class="page-link" aria-label="Current page 1">{i}</a></li>);
                  }else{
                    return(<li onClick={() => this.pageChange(i)} class=" page-item"><a class="page-link" aria-label="Go to page 2">{i}</a></li>)
                  }
                })}
                {page.endPage !== page.lastPage ? <li class="page-item" onClick={() => this.nextpage()}><a class="page-link" aria-label="Go to next page" aria-disabled="false">›</a></li> : ''} {/*다음 */}
              </ul>
            </nav>
          </div>         
        }       
        {this.props.mode===_Chart &&
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
                    <DialogTitle>
                      {this.state.start[0]}년
                      {this.state.start[1]}월
                      {this.state.start[2]}일
                    </DialogTitle>
                    <DialogContent>          
                      <CFormGroup row>
                        <CCol md="6">
                          <CLabel htmlFor="start_date">시간</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                        <font>{this.state.title}</font>
                        </CCol>
                      </CFormGroup>
                  </DialogContent>
          
                  <DialogActions>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
          </div>
        }
       
      </div>
    );
  }
}

export default AttTable;

import React, { Component } from 'react'
import {CButton,CCard,CCardBody, CCardFooter,CCardHeader,CCol,CForm,CFormGroup,CRow,CSelect,CLabel} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import moment from "moment"


class AttUpdate extends Component{
  constructor(props) {
    super(props)
    this.state = {
      attList: "",
      day: "",
      start_time: "",
      end_time: "",
      night: ""
    }
  }
  componentDidMount(){
    const { params } = this.props.match;
    axios.get("http://localhost:8083/Attget?no="+params.no).then(res => {
      console.log(res);
      this.setState({
        attList: res.data.list
      })
    }).catch(res => console.log(res))

  }

  getMAX_day(y,m){
    return new Date(y,m,0).getDate()
  }

  makeYears(yyyy){
    var result=[];
    for(var i=4;i>=0;i--) result.push(Number(yyyy)-i)   
    for(var l=1;l<5;l++) result.push(Number(yyyy)+l)    
    return result;
  }
  
  OneToTwo(i){
    if(Number(i)<10){
      if(i.length<2){
        i="0"+i;
      }
    } 
    return i;
  }

  makeDays(MAXday){
    var days=[];
    if(Number(MAXday)===24){
      for(var i=1;i<=MAXday;i++){
        days.push(this.OneToTwo(i));
      }
    }else{
      for(var l=1;l<=MAXday;l++){
        days.push(l);
      }
    }
    return days;
  }

  makeTimes(MAX){
    var days=[];
    for(var i=0;i<=MAX;i++){
      days.push(this.OneToTwo(i));
    }
    return days;
  }


  reset(){
    const { attList } = this.state;
    const yyyy=moment(attList.day).format("YYYY");
    const mm=moment(attList.day).format("MM");
    const dd=moment(attList.day).format("DD");
    const S_hh=moment("2020-11-11 "+attList.start_time).format("HH");
    const S_mi=moment("2020-11-11 "+attList.start_time).format("mm");
    const S_ss=moment("2020-11-11 "+attList.start_time).format("ss");
    const E_hh=moment("2020-11-11 "+attList.end_time).format("HH");
    const E_mi=moment("2020-11-11 "+attList.end_time).format("mm");
    const E_ss=moment("2020-11-11 "+attList.end_time).format("ss");
   
    var list=[yyyy,mm,Number(dd),S_hh,S_mi,S_ss,E_hh,E_mi,E_ss,attList.night]
    var tag = document.getElementsByClassName("re");
    for(var i=0;i<tag.length;i++){
      console.log(list[i])
      console.log(tag[i].value)
      tag[i].value=list[i]
    }
  }

  handleSubmit(e){
    var indata = [];
    var temp = [];
    for(var i=0;i<e.length;i++){
      temp.push( this.OneToTwo(e[i].value))
    }
    indata.push({
      "no": this.state.attList.no,
      "employee_no": this.state.attList.employee_no,
      "day": temp[0]+"-"+temp[1]+"-"+temp[2],
      "start_time": temp[3]+":"+temp[4]+":"+temp[5],
      "end_time": temp[6]+":"+temp[7]+":"+temp[8],
      "night": temp[9]
    });
    axios.post(
      'http://localhost:8083/Attupdate',indata
    )
      .then(function (response){
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      })
  }

  submit(){
    document.getElementById("form").submit();
  }

  render(){
    const { attList } = this.state;
    const yyyy=moment(attList.day).format("YYYY");
    const mm=moment(attList.day).format("MM");
    const dd=moment(attList.day).format("DD");
    const S_hh=moment("2020-11-11 "+attList.start_time).format("HH");
    const S_mi=moment("2020-11-11 "+attList.start_time).format("mm");
    const S_ss=moment("2020-11-11 "+attList.start_time).format("ss");
    const E_hh=moment("2020-11-11 "+attList.end_time).format("HH");
    const E_mi=moment("2020-11-11 "+attList.end_time).format("mm");
    const E_ss=moment("2020-11-11 "+attList.end_time).format("ss");
    const MAX_day=this.getMAX_day(yyyy,mm);
    const years=this.makeYears(yyyy);
    const days=this.makeDays(MAX_day);
    const months=[1,2,3,4,5,6,7,8,9,10,11,12];
    const times=this.makeDays(24);
    const mins=this.makeTimes(60);
    const secs=this.makeTimes(60);
    const OX=[0,1];
    return (
      <CCard>
        <CCardHeader>
          Number : {attList.no}
          <small> employee : {attList.employee_no}</small>
        </CCardHeader>
        <CCardBody>
          <CForm className="form-horizontal" id="form" method="GET" onSubmit={
            event  => {
              this.handleSubmit(event.target);
            }}>
            <CRow>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccyear">Year</CLabel>
                  <CSelect custom name="year" id="ccyear" className="re">
                    {years.map((yeardata)=>{
                      if(yeardata===Number(yyyy)){return( <option selected="selected" value={yeardata}>{yeardata}</option> )}
                      else{return( <option value={yeardata}>{yeardata}</option> )}
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Month</CLabel>
                  <CSelect custom name="month" id="ccmonth" className="re">
                    {months.map((monthdata)=>{
                      if(monthdata===Number(mm)){return( <option selected="selected" value={monthdata}>{monthdata}</option> );}
                      else{return( <option value={monthdata}>{monthdata}</option> );}
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Day</CLabel>
                  <CSelect custom name="day" id="ccmonth" className="re">
                    {days.map((daydata)=>{
                      if(daydata===Number(dd)) return(<option selected="selected" value={daydata}>{daydata}</option>);
                      else return(<option value={daydata}>{daydata}</option>)
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">START</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SH" id="ccmonth" className="re">
                  {times.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_hh))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SM" id="ccmonth" className="re">
                  {mins.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_mi))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SS" id="ccmonth" className="re">
                  {secs.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_ss))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">END</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="EH" id="ccmonth" className="re">
                  {times.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_hh))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="EM" id="ccmonth" className="re">
                  {mins.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_mi))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ES" id="ccmonth" className="re">
                  {secs.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_ss))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">NIGHT</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom name="night" id="ccmonth" className="re"> 
                  {OX.map((ox) => {
                    var temp="O"
                    if(ox===0) temp="X";
                    if(ox===attList.light) return(<option value={ox} selected="selected">{temp}</option>);
                    else return(<option value={ox}>{temp}</option>);
                  })}                 
                </CSelect>
              </CCol>
            </CFormGroup>
            <CCardFooter>
          <CButton type="submit" size="sm" color="primary" ><CIcon name="cil-scrubber" /> Submit</CButton> <CButton size="sm" color="danger" onClick={()=>{this.reset()}}><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
          </CForm>
        </CCardBody>
      </CCard>       
    )
  }
}
export default AttUpdate
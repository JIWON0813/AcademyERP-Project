import React, { Component } from "react";
import axios from "axios";
import '../Template/css/table.css';
import {CDropdownItem} from '@coreui/react'
import CIcon from '@coreui/icons-react'
var session_no=window.sessionStorage.getItem('no');
const style={width: "50%"}
class AttInOut extends Component {
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
    return (
    <div style={style}>
      {/* <CRow className="align-items-center">
          <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
            <CButton block variant="outline" color="primary"onClick={this.in}>출근하기</CButton>
          </CCol>
          <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
            <CButton block variant="outline" color="primary" onClick={this.out}>퇴근하기</CButton>
          </CCol>
          <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
            <CButton block variant="outline" color="primary" onClick={this.night}>연장근무</CButton>
          </CCol>
      </CRow>
      <br></br> */}
      <div onClick={this.in}>
        <CDropdownItem>
          <CIcon name="cil-sun" className="mfe-2" />
          출근
        </CDropdownItem>
      </div>

      <div onClick={this.out}>
        <CDropdownItem>
          <CIcon name="cil-home" className="mfe-2" />
          퇴근
        </CDropdownItem>
      </div>

      <div onClick={this.night}>
        <CDropdownItem>
          <CIcon name="cil-moon" className="mfe-2" />
          연장
        </CDropdownItem>
      </div>
    </div>
    );
  }
}

export default AttInOut;

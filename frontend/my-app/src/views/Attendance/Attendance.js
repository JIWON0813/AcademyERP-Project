import React, { Component } from "react";
import AttTable from "./AttTable";
import '../css/table.css';
import Down from '../../suminCP/excel';
import {
  CButton,
  CCol,
  CRow
} from '@coreui/react'
const style={width: "60%"}


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        mode: 0,
    }
    this.change = this.change.bind(this);
    }

    change(input){
      this.setState(state => ({
        mode: input
      }));
    }
  

  render() {
    const _default=0,_weekly=1,_monthly=2,_chart=3;
    return (
      <div>
        <div style={style}>
          <CRow className="align-items-center">
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CButton block variant="outline" color="info" onClick={() => {this.change(_default); }}>기본</CButton>
              </CCol>
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CButton block variant="outline" color="info" onClick={() => {this.change(_weekly); }}>주간</CButton>
              </CCol>
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CButton block variant="outline" color="info" onClick={() => {this.change(_monthly); }}>일간</CButton>
              </CCol>
              <CCol col="6" sm="3" md="2" xl className="mb-3 mb-xl-0">
                <CButton block variant="outline" color="info" onClick={() => {this.change(_chart); }}>차트</CButton>
              </CCol>
          </CRow>
        </div>
        <br/>
        <div>
          <AttTable mode={this.state.mode}/>
        </div>

        <Down name="Attendance"></Down>
      </div>
    );
  }
}

export default Users;

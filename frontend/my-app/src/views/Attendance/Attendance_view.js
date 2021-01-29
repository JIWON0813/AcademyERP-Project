import React, { Component } from "react";
import AttTable from "./Att_view";
import '../css/table.css';
import {
  CButton,
  CCol,
  CRow
} from '@coreui/react'
import AttInOut from './AttInOut'
const style={width: "100%"}
const style2={width: "50%"}

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
    const _default=0,_chart=3;
    return (
      <div>
        <div style={style}>

            <AttInOut></AttInOut>

            <br/>
            <br/>
            <br/>
          <div style={style2}>
            <CRow className="align-items-center">
                <CCol col="3" sm="3" md="2" xl className="mb-3 mb-xl-0">
                  <CButton block variant="outline" color="info" onClick={() => {this.change(_default); }}>기본</CButton>
                </CCol>

                <CCol col="3" sm="3" md="2" xl className="mb-3 mb-xl-0">
                  <CButton block variant="outline" color="info" onClick={() => {this.change(_chart); }}>달력</CButton>
                </CCol>
            </CRow>
          </div>
        </div>
        <br/>
        <div>
          <AttTable mode={this.state.mode}/>
        </div>
      </div>
    );
  }
}

export default Users;

import React, { Component } from "react";
import axios from "axios";
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'


class Consults extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ConsultList: ""
    }
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
    axios.get("http://localhost:8080/consultdetail?id="+params.id)
        .then(res => {
            this.setState({
              ConsultList: res.data.list
            })
        })
        .catch(res => console.log(res))
}

delete(){
  axios.delete(`http://localhost:8080/consult/`+this.state.ConsultList.no)
    .then(
      alert("삭제가 되었습니다."),
      document.location.href = "#/consult"
    )
    .catch(function (error){
      console.log(error)
    })
}

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const tempStyle={float:"left"}
    const tempStyle2={float:"right"}
    
    const { ConsultList } = this.state;

    return (
      <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
          <div style={tempStyle2}>
            <button onClick={this.goBack}>뒤로가기</button>
          </div> 
          <div style={tempStyle}>
            <h3>상담자: {ConsultList.name}</h3>
          </div>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr><td>{`NO:`}</td><td><strong>{ConsultList.no}</strong></td></tr>
                  <tr><td>{`상담자:`}</td><td><strong>{ConsultList.name}</strong></td></tr>
                  <tr><td>{`번호:`}</td><td><strong>{ConsultList.hp}</strong></td></tr>
                  <tr><td>{`상담예약날짜:`}</td><td><strong>{ConsultList.schedule}</strong></td></tr>
                  <tr><td>{`메모:`}</td><td><strong>{ConsultList.memo}</strong></td></tr>
                  <tr><td>{`CALL/ONLINE:`}</td><td><strong>{ConsultList.route}</strong></td></tr>
                  <tr><td>{`작성자:`}</td><td><strong>{ConsultList.writer}</strong></td></tr>
                </tbody>
              </table>
              <CCardFooter align="right">
                {/* <CButton  size="sm" color="primary" onClick={()=>{this.handleFormSubmit()}}><CIcon name="cil-scrubber" /> Submit</CButton> */}
                &nbsp;&nbsp;&nbsp; 
                <CButton size="sm" color="danger" onClick={(e)=>{this.delete()}}><CIcon name="cil-ban" /> Delete</CButton>
              </CCardFooter>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    );
  }
}

export default Consults;

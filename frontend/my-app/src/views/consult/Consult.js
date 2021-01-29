//-----------------------
// 제목 : 상담 상세페이지
// 파일명 : Consult.js
// 작성자 : 최인아
// 작성일 : 
//-----------------------
import React from 'react'
import axios from 'axios';
import './table.css';
import { BrowserRouter, Route} from 'react-router-dom';
import {CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CLabel, CRow} from '@coreui/react'
import ConsultUpdate from "./ConsultUpdate";
import ConsultDelete from "./ConsultDelete";
class Consult extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        no : '',
        name : '',
        hp : '',
        schedule : '',
        memo : '',
        route : '',
        writer : ''
    }
    this.stateRefresh = this.stateRefresh.bind(this)
  }

componentDidMount() {
  this.getApi();
}

getApi = () => {
  axios.get("http://localhost:8080/consult/"+this.props.id)
    .then(res => {
      let con = res.data.consultdata;
      this.setState({
        no : con.no,
        name : con.name,
        hp : con.hp,
        schedule : con.schedule,
        memo : con.memo,
        route : con.route,
        writer : con.wirter
      })
    })
    .catch(res => console.log(res))
}

  stateRefresh() {
    this.setState({
      ConsultList: "",
    });
    this.getApi();
  }



  render() {
    return (
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>상담신청인 : {this.state.name}</CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">등록번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.no}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">전화번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.hp}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">상담일자</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.schedule}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">상담내용</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.memo}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">상담경로</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.route}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">작성자</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.writer}</CLabel>
                  </CCol>
                </CFormGroup>
                <BrowserRouter>
                  <Route exact path='/consultUpdate' component={ConsultUpdate}/>
                  <Route exact paht='/consultDelete/:id' component={ConsultDelete}/>
                </BrowserRouter>
               {/* <CFormGroup row>
                  <ConsultUpdate stateRefresh={this.props.stateRefresh} ConsultList={ConsultList}/>
                  <ConsultDelete stateRefresh={this.props.stateRefresh} id={ConsultList.no}/>
                </CFormGroup> */}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
      </CRow>
    );
  }
}
export default Consult;



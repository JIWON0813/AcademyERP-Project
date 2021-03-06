import React, { Component } from "react";
import './table.css';
import ApiService from "../../ApiService";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Edit_stu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      no: '',
      name: '',
      hp: '',
      email: '',
      birth: '',
      address: '',
      lecture: '',
      gender: '',
      regdate: ''
    }
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = () => {
    ApiService.Student(window.localStorage.getItem("StudentNO"))
      .then(res => {
        let stu = res.data.listdata;
        this.setState({
          no: stu.no,
          name: stu.name,
          hp: stu.hp,
          email: stu.email,
          birth: stu.birth,
          address: stu.address,
          lecture: stu.lecture,
          gender: stu.gender,
          regdate: stu.regdate
        })
      })
      .catch(err => {
        console.log('getApi() 에러', err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  saveStudent = (e) => {
    e.preventDefault();

    let student = {
      no: this.state.no,
      hp: this.state.hp,
      email: this.state.email,
      birth: this.state.birth,
      address: this.state.address,
      lecture: this.state.lecture,
    }

    ApiService.editStudent(student)
      .then(res => {
        this.setState({
          message: student.name + '님의 정보가 수정되었습니다'
        })
        console.log(this.state.message);
        this.props.history.push('/students');
      })
      .catch(err => {
        console.log('saveStudent() 에러', err);
      });
  }


  render() {
    return (
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              학생 정보 수정
                </CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>{this.state.name}</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">핸드폰 번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="hp" placeholder={this.state.hp} value={this.state.hp} onChange={this.onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">이메일주소</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="email" placeholder={this.state.email} value={this.state.email} onChange={this.onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">생년월일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" name="birth" placeholder={this.state.birth} value={this.state.birth} onChange={this.onChange} />
                  </CCol>
                </CFormGroup><CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">주소 입력</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="address" placeholder={this.state.address} value={this.state.address} onChange={this.onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">수강과목</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="lecture" onChange={this.onChange}>
                      <option value="0">과목을 선택하세요</option>
                      <option value="1">JAVA</option>
                      <option value="2">PYTHON</option>
                      <option value="3">C++</option>
                      <option value="4">KOTLIN</option>
                      <option value="5">수강과목 없음</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton onClick={this.saveStudent} size="sm" color="primary"><CIcon name="cil-scrubber" /> 저장 </CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> 초기화 </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default Edit_stu
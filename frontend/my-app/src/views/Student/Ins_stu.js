import React, { Component } from "react";
//import axios from "axios";
import ApiService from "../../ApiService";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
   // import { DocsLink } from 'src/reusable'

class Ins_stu extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      hp: '',
      email: '',
      bitrh: '',
      address: '',
      curri: '',
      gender: '',
      regdate:''
    }
  }

  onChange =(e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  saveStudent = (e) => {
    e.preventDefault();

    console.log(this.state.email)

    let student = {
      name : this.state.name,
      hp : this.state.hp,
      email : this.state.email,
      birth : this.state.birth,
      address : this.state.address,
      curri : this.state.curri,
      gender : this.state.gender,
      //regdate : this.state.regdate
    }

    console.log(this.state.email)

    ApiService.addStudent(student)
    .then( res => {
      this.setState({
        message : student.name + '님이 성공적으로 등록되었습니다'
      })
      console.log(this.state.message);
      this.props.history.push('/students');
    })
    .catch( err => {
      console.log('saveStudent() 에러', err);
    });

  }

  render() {
    return (
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              학생 정보 등록
              <small> Elements</small>
            </CCardHeader>
            <CCardBody>
              <CForm>
               <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="name" placeholder="이름" value={this.state.name} onChange={this.onChange} />
                    <CFormText>이름을 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">핸드폰 번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="hp" placeholder="핸드폰 번호" value={this.state.hp} onChange={this.onChange}/>
                    <CFormText>숫자만 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">이메일주소</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="email" placeholder="이메일 주소" value={this.state.email} onChange={this.onChange}/>
                    <CFormText className="help-block">이메일주소를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">생년월일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" name="birth" placeholder="생년월일" value={this.state.birth} onChange={this.onChange}/>
                  </CCol>
                </CFormGroup><CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">주소 입력</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="address" placeholder="주소" value={this.state.address} onChange={this.onChange}/>
                    <CFormText>주소를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">수강과목</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="curri" onChange={this.onChange}>
                    <option value="0">과목을 선택하세요</option>
                      <option value="JAVA">JAVA</option>
                      <option value="PYTHON">PYTHON</option>
                      <option value="C++">C++</option>
                      <option value="KOTLIN">KOTLIN</option>
                      <option value="">수강과목 없음</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">성별</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="gender" onChange={this.onChange}>
                    <option value="0">성별을 선택하세요</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton onClick={this.saveStudent} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          </CCol>
        </CRow>
    );}
}

export default Ins_stu;
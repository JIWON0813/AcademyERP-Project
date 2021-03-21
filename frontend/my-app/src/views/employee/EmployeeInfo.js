import React, {Component} from 'react'
import ApiService from "../../ApiService";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CFormGroup,
  CFormText,
  CInput,
  CLabel
} from '@coreui/react'
import CIcon from "@coreui/icons-react";

class EmployeeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      hp : '',
      address : '',
      email : '',
      birth : ''
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange = (value) => {
    this.setState({
      [value.target.name] : value.target.value
    })
  }

  onSubmit = (x) =>{
    x.preventDefault();

    console.log('test ::' + this.state.hp)

    let employee = {
      name : this.state.name,
      hp : this.state.hp,
      email : this.state.email,
      birth : this.state.birth,
      address : this.state.address,
    }

    ApiService.PermitEmployee(employee).then(res =>{
      alert('회원가입 신청이 완료되었습니다. 관리자의 승인을 기다려주세요');
      this.props.history.push('/');
    })
      .catch( err => {
        console.log('회원가입 신청에 실패했습니다 관리가제에 문의해주세요', err);
        this.props.history.push('/');
      });

  }

  render() {
    return (
      <div>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader align={'center'}>
                <h2>회원가입</h2>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">이름</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="name" value={this.state.name} onChange={this.onValueChange}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">휴대폰번호</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="hp" value={this.state.hp} onChange={this.onValueChange}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">주소</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="address"value={this.state.address} onChange={this.onValueChange}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">이메일</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="email"value={this.state.email} onChange={this.onValueChange}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">생일</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="birth"value={this.state.birth} onChange={this.onValueChange}/>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary" onClick={this.onSubmit}><CIcon name="cil-scrubber" />등록</CButton>
                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" />초기화</CButton>
                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" />취소</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default EmployeeInfo

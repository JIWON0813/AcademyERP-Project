import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id:"",
        password:""
    }
  }
  goToMain = () => {
    console.log(this.props);
    this.props.history.push("/")
  }

  btnClick = () => {
    console.log("사용자 ID : ",this.state.id);
    console.log("사용자 password : ",this.state.password);
    this.goToMain();
  }

  LoginSuccess = (e) => {
    e.preventDefault();

    window.sessionStorage.setItem('id',1);
    window.sessionStorage.setItem('no',1);
    window.sessionStorage.setItem('dep',1);
    window.sessionStorage.setItem('branch',1);

    window.sessionStorage.setItem("LoginID", this.state.id);
    window.sessionStorage.setItem("LoginPW", this.state.password);
    console.log(window.sessionStorage.getItem("LoginID"));
    console.log(window.sessionStorage.getItem("LoginPW"));
    //this.props.history.push('../notice/Notice.js');
    document.location.href = "#/notice";

}

  render() {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Id" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={this.LoginSuccess}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/saveEmployee">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
}

export default login

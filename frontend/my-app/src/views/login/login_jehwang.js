import React, { Component } from "react";
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        asd: ""
    }
  }

  componentDidMount() {
    const { params } = this.props.match;
    if(Number(params.log)===0){
      this.logIN();
    }else{
      this.logOUT()
    }
  }

  logIN = () =>{
    const { params } = this.props.match;
    window.sessionStorage.setItem('id',params.id);
    window.sessionStorage.setItem('no',params.no);
    window.sessionStorage.setItem('password',params.password);
    //console.log( window.sessionStorage.getItem('dep',params.dep))
    this.setState ({asd: params.no});
    alert("로그인");
    document.location.href = "#";
    window.location.reload(false);
  }

  logOUT = () =>{
    window.sessionStorage.clear();
    alert("로그아웃");
    document.location.href = "#";
    window.location.reload(false);
  }

  render() {
  return (
  <CRow>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Login Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="id" name="id" placeholder="id를 입력하세요." autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password" name="password를 입력하세요." placeholder="Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="success">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
</CRow>
  )
}
}

export default login;
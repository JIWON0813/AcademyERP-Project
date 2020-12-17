import React,{ Component } from "react";
import './table.css';
//import { Link } from 'react-router-dom';
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
  import { DocsLink } from 'src/reusable'

class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            no : '',
            name : '',
            hp : '',
            email : '',
            birth : '',
            address : '',
            curri : '',
            gender : '',
            regdate : ''
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
            ApiService.Student(window.localStorage.getItem("StudentNO"))
                .then(res => {
                    let stu =  res.data.listdata;
                    this.setState({
                        no : stu.no,
                        name : stu.name,
                        hp : stu.hp,
                        email : stu.email,
                        birth : stu.birth,
                        address : stu.address,
                        curri : stu.curri,
                        gender : stu.gender,
                        regdate : stu.regdate
                    })
                })
            .catch(err =>{
                console.log('getApi() 에러', err);
            });
        }

    delStu = (NO) => {
        ApiService.deleteStudent(NO)
        .then( res => {
            this.setState({
                message : 'User Deleted Suscces'
            });
            alert(this.state.message);
            this.props.history.push('/students');
        })
        .catch(err => {
            console.log('delStu() Error!', err);
        })
    }

    editStu = (NO) => {
        window.localStorage.setItem("StudentNO", NO);
        this.props.history.push('/edit_stu');
    }

    render() {
        return (
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            학생 상세 정보
                        </CCardHeader>
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
                                        <CLabel htmlFor="text-input">이름</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.name}</CLabel>
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
                                        <CLabel htmlFor="text-input">이메일</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.email}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">생년월일</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.birth}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">주소</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.address}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">교육과정</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.curri}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">성별</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.gender}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">등록일</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CLabel>{this.state.regdate}</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                    <CButton block color="secondary" onClick={() => this.editStu(this.state.no)}>수정</CButton>
                                    </CCol>
                                    <CCol xs="12" md="3">
                                    <CButton block color="secondary" onClick={() => this.delStu(this.state.no)}>삭제</CButton>
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

export default Student;

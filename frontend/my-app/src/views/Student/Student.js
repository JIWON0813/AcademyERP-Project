import React,{ useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import './table.css';
import ApiService from "../../ApiService";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CLabel,
    CRow
  } from '@coreui/react'

  const StudentData =({ match }) => {
    const [inputs, setInputs] = useState({
        no : '',
        name : '',
        hp : '',
        email : '',
        birth : '',
        address : '',
        lecture : '',
        gender : '',
        regdate : ''
    });

    useEffect(() => {
        getApi();
    },[]);

    const {no,name,hp,email,birth,address,lecture,gender,regdate} = inputs;

    const getApi = () => {
        ApiService.Student(match.params.no)
            .then(res => {
                let stu =  res.data.listdata;
                setInputs({
                    no : stu.no,
                    name : stu.name,
                    hp : stu.hp,
                    email : stu.email,
                    birth : stu.birth,
                    address : stu.address,
                    lecture : stu.lecture,
                    gender : stu.gender,
                    regdate : stu.regdate
                })
                console.log(stu.no)
            })
        .catch(err =>{
            console.log('getApi() 에러', err);
        });
    }

    let history = useHistory();

    const delStu = () => {
        
        ApiService.deleteStudent(match.params.no)
        .then( res => {
            alert('성공적으로 삭제되었습니다.');
            history.push('/students');
        })
        .catch(err => {
            console.log('delStu() Error!', err);
        })
    }

    const editStu = (NO) => {
        window.localStorage.setItem("StudentNO", match.params.no);
        history.push('/edit_stu');
    }

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
                                <CLabel>{no}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">이름</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{name}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">전화번호</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{hp}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">이메일</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{email}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">생년월일</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{birth}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">주소</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{address}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">교육과정</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{lecture}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">성별</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{gender}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">등록일</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CLabel>{regdate}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                <CButton block color="secondary" onClick={editStu}>수정</CButton>
                                    </CCol>
                                    <CCol xs="12" md="3">
                                    <CButton block color="secondary" onClick={delStu}>삭제</CButton>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
  }
export default StudentData;

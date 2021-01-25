import React, { Component } from "react";
import './table.css';
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";
import { DocsLink } from 'src/reusable';
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

class Stu_att extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            attdata: '',
            no: '',
            leclist: '',
            lecture: '',
            date:''
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        ApiService.Leclist()
            .then(res => {
                console.log(res);
                this.setState({
                    leclist: res.data.list
                })
            })
            .catch(res => console.log(res))

    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    SearchAtt = (name) => {
        ApiService.StuAtt(name)
            .then(res => {
                this.setState({
                    attdata: res.data.attdata
                })
            })
            .catch(err => {
                console.log('SearchAtt() 에러', err)
            })
    }

    // lectureSelect = (e) => {
    //     this.setState({
    //         findLecture: e.target.value
    //     })
    // }

    InsertAtt = (e) => {
        e.preventDefault();
        window.localStorage.setItem("InsDateAtt", this.state.date);
        window.localStorage.setItem("InsLecAtt", this.state.lecture);
        console.log(window.localStorage.getItem("InsLecAtt"));
        this.props.history.push('/ins_att');
        
    }
    
    render() {
        const { attdata } = this.state;
        const { leclist } = this.state;
        return (
            <div>
                <CRow>
                    <CCol xs="15" md="6">
                        <CCard>
                            <CCardHeader>
                                학생 출결 등록
                <DocsLink name="-Input" />
                            </CCardHeader>
                            <CCardBody>
                                <CForm>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="text-input">강의선택</CLabel>
                                        </CCol>
                                        <CCol>
                                            <CSelect custom id="lecture" name="lecture" value={this.state.lecture} onChange={this.onChange}>
                                                <option value="">강의</option>
                                                {leclist && leclist.map((itemdata, insertIndex) => {
                                                    return (<option value={itemdata.name}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                                                })}
                                            </CSelect>
                                            <CFormText>강의를 선택하세요</CFormText>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="text-input">날짜선택</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="date" id="date-input" name="date" placeholder="date" value={this.state.date} onChange={this.onChange} />
                                            <CFormText>날짜를 선택하세요</CFormText>
                                        <CButton onClick={this.InsertAtt} size="sm" color="primary"><CIcon name="cil-scrubber" /> 출결조회 </CButton>
                                        </CCol>
                                    </CFormGroup>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="15" md="6">
                        <CCard>
                            <CCardHeader>
                                학생 출결 조회
                <DocsLink name="-Input" />
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
                                            <CButton onClick={() => this.SearchAtt(this.state.name)} size="sm" color="primary"><CIcon name="cil-scrubber" /> 출결조회 </CButton>
                                        </CCol>
                                    </CFormGroup>
                                    <table>
                                        <tr><td>날짜</td><td>강의명</td><td>출결여부</td></tr>
                                        {attdata && attdata.map((itemdata, insertIndex) => {
                                            return (
                                                <tr>
                                                    <td>{itemdata.date}</td>
                                                    <td>{itemdata.lecname}</td>
                                                    {itemdata.att === 0 ? <td>출석</td> : (itemdata.att === 1 ? <td>결석</td> : <td>지각</td>)}
                                                </tr>
                                            );
                                        })}
                                        <tr></tr>
                                    </table>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        )
    }
}

export default Stu_att;

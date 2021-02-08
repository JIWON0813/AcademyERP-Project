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
  //import { DocsLink } from 'src/reusable'

  class Edit_stu extends Component{

    constructor(props) {
        super(props)
        this.state = {
            name : '',
            salary : ''
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        ApiService.SalaryEmp(window.localStorage.getItem("SalNO"))
            .then(res => {
                let emp =  res.data.list;
                this.setState({
                    name : emp.name,
                    salary : emp.salary
                })
            })
        .catch(err =>{
            console.log('getApi() 에러', err);
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveSalary = (e) => {
        e.preventDefault();

        let employee = {
            name : this.state.name,
            salary : this.state.salary   
        }

        ApiService.editStudent(employee)
            .then( res => {
            this.setState({
                message : employee.name + '님의 정보가 수정되었습니다'
            })
            console.log(this.state.message);
            this.props.history.push('/sal_list');
            })
            .catch( err => {
            console.log('saveSalary() 에러', err);
            });
    }


    render() {
        return (
          <CRow>
            <CCol xs="12" md="6">
              <CCard>
                <CCardHeader>
                  직원 급여 수정
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
                        <CInput name="hp" placeholder={this.state.salary} value={this.state.salary} onChange={this.onChange}/>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton onClick={this.saveSalary} size="sm" color="primary"><CIcon name="cil-scrubber" /> 저장 </CButton>
                  <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> 초기화 </CButton>
                </CCardFooter>
              </CCard>
              </CCol>
            </CRow>
        );}
}

export default Edit_stu
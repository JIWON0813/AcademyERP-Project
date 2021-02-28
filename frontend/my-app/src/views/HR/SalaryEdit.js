import React,{ useEffect,useState } from "react";
import './table.css';
import { useHistory } from "react-router-dom";
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
import { AlertTitle } from "@material-ui/lab";
  //import { DocsLink } from 'src/reusable'

    const EditSalary =({ match }) => {
      const [inputs, setInputs] = useState({
        name : '',
        salary : ''
      });
  
      useEffect(() => {
          getApi();
      },[]);
    
    const {name,salary} = inputs;

    const getApi = () => {
        ApiService.SalaryEmp(match.params.no)
            .then(res => {
                let emp =  res.data.list[0];
                console.log(emp.name)
                setInputs({
                    name : emp.name,
                    salary : emp.salary
                })
                console.log(emp.name)
                console.log(match.params.no)
            })
        .catch(err =>{
            console.log('getApi() 에러', err);
        });
    }

    const onChange = (e) => {
        setInputs({
            [e.target.name] : e.target.value,
            name : name
        });
    }

    let history = useHistory();

    const saveSalary = (e) => {
        e.preventDefault();

        let employee = {
            name : name,
            salary : salary   
        }

        ApiService.EditSalary(employee)
            .then( res => {
            alert("급여수정되었습니다.");
            history.push('/sal_list');
            })
            .catch( err => {
            console.log('saveSalary() 에러', err);
            });
    }

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
                      <CLabel>{name}</CLabel>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">급여</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput name="salary" placeholder={salary} value={salary} onChange={onChange}/>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton onClick={saveSalary} size="sm" color="primary"><CIcon name="cil-scrubber" /> 저장 </CButton>
                  <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> 초기화 </CButton>
                </CCardFooter>
              </CCard>
              </CCol>
            </CRow>
        );
      }


export default EditSalary
import React,{ Component,useState } from "react";
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
            name:'',
            attdata:'',
            no:'',
            leclist:''
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
                    leclist : res.data.content
                })
            })
            .catch(res => console.log(res))
            
    }
    

    onChange =(e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }

    SearchAtt = (name) => {
        ApiService.StuAtt(name)
            .then(res => {
                this.setState({
                    attdata : res.data.attdata
                })
            })
        .catch(err =>{
            console.log('SearchAtt() 에러', err)
        })
        
        
    }
    
    render() {
        const { attdata } =  this.state;
        const { leclist } =  this.state;
        return (
            <div>
            <CForm>
            <CSelect custom id="lecture" onChange={this.branchSelect} value={this.state.findBranch}>
              <option value="">강의</option>
              {leclist && leclist.map((itemdata, insertIndex) => {
                return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
              })}
            </CSelect>
            </CForm>
            <CRow>
            <CCol xs="12" md="6">
             
            <CCardBody>
            <CForm>
            <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="name" placeholder="이름" value={this.state.name} onChange={this.onChange} />
                    <CFormText>이름을 입력하세요</CFormText>
                    <CButton onClick={ () => this.SearchAtt(this.state.name)} size="sm" color="primary"><CIcon name="cil-scrubber" /> 출결조회 </CButton>
                </CCol>
            </CFormGroup>
            
            <table>
            <tr><td>날짜</td><td>강의명</td><td>출결여부</td></tr>
                {attdata&&attdata.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.date}</td>
                    <td>{itemdata.lecname}</td>
                    {itemdata.att === 0 ? <td>출석</td> : ( itemdata.att === 1 ?<td>결석</td> : <td>지각</td>)}
                    </tr>
                    );
                })}
                <tr></tr>
            </table>
            
            </CForm>
            </CCardBody>
            </CCol>
            </CRow>
            </div>
        )
    }
}

export default Stu_att;

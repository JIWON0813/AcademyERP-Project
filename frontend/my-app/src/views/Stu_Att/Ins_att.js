import React, { Component } from "react";
import ApiService from "../../ApiService";
import './table.css';
import { Link } from 'react-router-dom';
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
import Lecture from "../lecture/Lecture";

class Ins_att extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            attStu : '',
            LectureName : '',
            InsDate : ''
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        console.log(window.localStorage.getItem("InsLecAtt"));
        ApiService.InsAtt(window.localStorage.getItem("InsLecAtt"))
            .then(res => {
                console.log(res);
                this.setState({
                    attStu : res.data.list,
                    LectureName : window.localStorage.getItem("InsLecAtt"),
                    InsDate : window.localStorage.getItem("InsDateAtt")
                })
            })
            .catch(res => console.log(res))

    }

    saveAtt = (e) => {
        e.preventDefault();
    
        console.log(this.state.email)
    
        let student = {
          name : this.state.name,
          hp : this.state.hp,
          email : this.state.email,
          birth : this.state.birth,
          address : this.state.address,
          lecture : this.state.lecture,
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
        const { attStu,LectureName,InsDate } = this.state;
        return(
            <div>
            
            <tr><td>수업이름</td><td>{LectureName}</td><td>날짜</td><td>{InsDate}</td><td colSpan='3'></td></tr>
            <table>  
            <tr><td>no</td><td>name</td><td>출결</td><td></td><td></td><td></td><td></td></tr>
                {attStu&&attStu.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.name}</td>
                    <td>
                    {/* <td width ="80"><CButton block color="secondary" onClick={() => this.selStu(itemdata.no)}>상세</CButton></td> */}
                    <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="0" defaultChecked/>
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">출석</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="1" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">결석</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio3" name="inline-radios" value="2" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">지각</CLabel>
                    </CFormGroup>
                  </CCol>
                  </td>
                </tr>
                    );
                })}
            <tr><td>
            <CButton onClick={this.saveAtt} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </td></tr>
            </table>
            </div>
                             
        )
    }

}

export default Ins_att;
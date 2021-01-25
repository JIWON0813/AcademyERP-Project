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

class Ins_att extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            attStu : ''
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
                    attStu : res.data.list
                })
            })
            .catch(res => console.log(res))

    }

    render() {
        const { attStu } = this.state;
        return(
            <div>
            <table>
            <tr><td>no</td><td>name</td><td>hp</td><td>email</td><td>birth</td><td>address</td><td>lecture</td><td>gender</td><td>regdate</td></tr>
                {attStu&&attStu.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.hp}</td>
                    <td>{itemdata.email}</td>
                    <td>{itemdata.birth}</td>
                    <td>{itemdata.address}</td>
                    <td>{itemdata.lecture}</td>
                    <td>{itemdata.gender}</td>
                    <td>{itemdata.regdate}</td>
                    {/* <td width ="80"><CButton block color="secondary" onClick={() => this.selStu(itemdata.no)}>상세</CButton></td> */}
                    </tr>
                    );
                })}
            <tr><td>
                <Link to={"/ins_stu"}>학생등록하기</Link>
                </td></tr>
                <tr><td>
            </td></tr>
            </table>
            </div>
                             
        )
    }

}

export default Ins_att;
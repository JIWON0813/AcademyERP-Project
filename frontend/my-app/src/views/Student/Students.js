import React,{ Component } from "react";
import './table.css';
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
  } from '@coreui/react'

class Students extends Component {

    constructor(props) {
        super(props)
        this.state = {
            StudentList: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        ApiService.Students()
            .then(res => {
                console.log(res);
                this.setState({
                    StudentList : res.data.listdata
                })
            })
            .catch(res => console.log(res))
    }

    selStu = (NO) => {
        console.log(NO)
        window.localStorage.setItem("StudentNO", NO);
        this.props.history.push('/student');
    }

    render() {
        const { StudentList } =  this.state;
        console.log(StudentList);
        return (
            <div>
            <table>
            
            <tr><td>no</td><td>name</td><td>hp</td><td>email</td><td>birth</td><td>address</td><td>curri</td>
            <td>gender</td><td>regdate</td><td></td></tr>
           
            
                {StudentList&&StudentList.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.hp}</td>
                    <td>{itemdata.email}</td>
                    <td>{itemdata.birth}</td>
                    <td>{itemdata.address}</td>
                    <td>{itemdata.curri}</td>
                    <td>{itemdata.gender}</td>
                    <td>{itemdata.regdate}</td>
                    <td width ="80"><CButton block color="secondary" onClick={() => this.selStu(itemdata.no)}>상세</CButton></td>
                    </tr>
                    );
                })}
            <tr><td>
                <Link to={"/ins_stu"}>학생등록하기</Link>
                </td></tr>
            </table>
            </div>
        );
 
    }

}

export default Students;

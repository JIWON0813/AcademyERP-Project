import React,{ Component } from "react";
import './table.css';
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";
import { DocsLink } from 'src/reusable';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CPagination
  } from '@coreui/react'


class SalaryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            SalaryList: ''
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        ApiService.Salary()
            .then(res => {
                console.log(res);
                this.setState({
                    SalaryList : res.data.list    
                })
            })
            .catch(res => console.log(res))
            
    }

    selSal = (NO) => {
        window.localStorage.setItem("SalNO", NO);
        this.props.history.push('/sal_edit');
    }
    
    render() {
        const { SalaryList } =  this.state;
        
        return (
            <div>
            <table>
            <tr><td>no</td><td>branch</td><td>name</td><td>salary</td></tr>
                {SalaryList&&SalaryList.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.branch}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.salary}</td>
                    <td width ="80"><CButton block color="secondary" onClick={() => this.selSal(itemdata.no)}>급여수정</CButton></td>
                    </tr>
                    );
                })}
            </table>
            </div>
        )
    }
}

export default SalaryList;

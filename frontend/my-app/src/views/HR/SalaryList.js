import React,{ useEffect,useState } from "react";
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


  const SalaryCheck = () => {
    const [inputs, setInputs] = useState({
        SalaryList: ''
    });

    useEffect(() => {
        getApi(0);
    },[]);

    const {SalaryList} = inputs;

    const getApi = () => {
        ApiService.Salary()
            .then(res => {
                setInputs({
                    SalaryList : res.data.list    
                })
            })
            .catch(res => console.log(res))
            
    }

    const setSal = (NO) => {
        window.localStorage.setItem("SalNO", NO);
        console.log("qweqwe" +NO);
        this.props.history.push('/sal_edit');
    }
        
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
                    <td width ="80"><Link to={`/sal_edit/${itemdata.no}`}>급여수정</Link></td>
                    </tr>
                    );
                })}
            </table>
            </div>
        )
    }

    export default SalaryCheck  

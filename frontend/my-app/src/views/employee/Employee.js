import React, {Component, useState} from 'react'
import ApiService from "../../ApiService";
import {CCard, CCardBody, CCardHeader, CPagination} from "@coreui/react";
import {DocsLink} from "../../reusable";
import Pagination from "../Template/base/paginations/Pagnations";

class Employee extends Component {

  constructor(props) {
    super(props)
    this.state = {
      employeeList: [],
      pageable :{
        currentPage : 1,
        size : 10,
        setCurrentPage : 0
      },
      verify : 0
    }
  }

  componentDidMount() {
    this.getApi();
  }

  getApi(){
    ApiService.getEmployee(this.state).then(res => {
      this.setState({
        employeeList : res.data.content,
        pageable :{
          currentPage : res.data.currentPage,
          size : res.data.size
        },
        verify : 0
      });
    })
      .catch(err =>{
        alert('읽어오는데 실패했습니다. err =' + err);
      });
  }

  render() {
    const {employeeList, currentPage, size , command} = this.state

    return (
      <div>
        <h2>직원 목록</h2>
         <table>
           <thead>
           <tr>
             <th>번호</th>
             <th>이름</th>
             <th>전화번호</th>
             <th>주소</th>
             <th>생년월일</th>
             <th>성별</th>
             <th>직급</th>
             <th>연봉</th>
           </tr>
           </thead>
           <tbody>
           {
             this.state.employeeList.map(
               data =>
             <tr key = {data.no}>
              <td>{data.no}</td>
               <td>{data.name}</td>
               <td>{data.hp}</td>
               <td>{data.address}</td>
               <td>{data.birth}</td>
               <td>{data.sex}</td>
               <td>{data.rank}</td>
               <td>{data.salary}</td>
             </tr>
             )
           }
           </tbody>
         </table>
        <CCard>
          <Pagination />
        </CCard>
      </div>
    );
  }
}

export default Employee

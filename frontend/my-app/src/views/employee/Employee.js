import React, {Component, useState} from 'react'
import ApiService from "../../ApiService";
import {CCard, CCardBody, CCardHeader, CPagination} from "@coreui/react";
import {DocsLink} from "../../reusable";

class Employee extends Component {

  constructor(props) {
    super(props)
    this.state = {
      employeeList: [],
      currentPage : 1,
      size : 10,
      setCurrentPage : 0
    }
  }

  componentDidMount() {
    ApiService.getEmployee(this.state).then(res => {
      this.setState({
        employeeList : res.data.content,
        currentPage : res.data.number+1,
        size : this.state,
        setCurrentPage : 0
      });
    });
  }

  render() {
    const {employeeList, currentPage, size , setCurrentPage} = {}//useState(0);

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
          <CPagination
            activePage={currentPage}
            pages={size}
            onActivePageChange={setCurrentPage}
          />
        </CCard>
      </div>
    );
  }
}

export default Employee

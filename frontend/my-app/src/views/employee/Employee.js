import React, {Component} from 'react'
import ApiService from "../../ApiService";
import Button from "@material-ui/core/Button";

class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeList: [],
      currentPage : 1,
      size : 10
    }
  }

  componentDidMount() {
    ApiService.getEmployee(this.state).then(res => {
      this.setState({
        employeeList : res.data.content,
        totalPages : res.data.totalPages,
        totalElements : res.data.totalElements,
        currentPage : res.data.number+1
      });
    });
  }

  render() {

    const {employeeList, currentPage, size} = this.state;

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

          <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}>
          </Button>


      </div>
    );
  }
}

export default Employee

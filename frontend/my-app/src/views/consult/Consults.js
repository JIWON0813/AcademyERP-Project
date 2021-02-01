//-----------------------
// 제목 : 상담 기록 리스트
// 파일명 : Consults.js
// 작성자 : 최인아
// 작성일 : 
//-----------------------
import React, { Component } from "react";
import axios from "axios";
import './table.css';
import { Link } from 'react-router-dom';
import { CButton, CInput, CForm } from "@coreui/react";
import ConsultInsert from "./ConsultInsert";

class Consults extends Component {
  constructor(props) {
    super(props)
    this.state = {
        keyword: '', //공백으로 지정
        ConsultList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this)
    this.handleChange = this.handleChange.bind(this);
}

handleChange(e) { //위에 지정되는 걸 변화
  this.setState({
  keyword: e.target.value
});
}

stateRefresh() {
  this.setState({
    ConsultList: ""
  });
  this.getApi(this.state.keyword);
}

componentDidMount() {
    this.getApi(this.state.keyword);
}

getApi = (keyword) => {
    axios.get("http://localhost:8080/consult?"+"&keyword=" + keyword)
        .then(res => {
            this.setState({
              ConsultList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { ConsultList } = this.state;

    return (
      <div>
      <table id="table1" border="0">
        <tr id="table1">
          <td id="table1">
            <CInput
              name="keyword"
              placeholder="Search"
              value={this.state.keyword}
              onChange={this.handleChange}
              class="w-25 p-3"
              //class="form-control"
            />&nbsp;&nbsp;&nbsp;
            <CButton color="light" class="btn btn-outline-info" 
                     onClick = {(e) => {
                                this.getApi(this.state.keyword)}}>검색</CButton>
          </td>
        </tr>
      </table>
      <header>
        <ConsultInsert stateRefresh={this.stateRefresh}/>
      </header>
        <br></br>
    <table>
        <thead>
            <td>NO</td>
            <td>name</td>
            <td>  hp  </td>
            <td>schedule</td>
            <td>memo</td>
            {/* <td>regdate</td> */}
            <td>route</td>
            <td>writer</td>
            <td>detail</td>
        </thead>
          <tbody>
           {ConsultList&&ConsultList.map((consultdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{consultdata.no}</td>
                <td>{consultdata.name}</td>
                {/* <td><Consult stateRefresh={this.stateRefresh} id={consultdata.no}/></td> */}
                <td>{consultdata.hp}</td>
                <td>{consultdata.schedule}</td>
                <td>{consultdata.memo}</td>
                {/* <td>{consultdata.regdate}</td> */}
                <td>{consultdata.route}</td>
                <td>{consultdata.writer}</td>
                <td><Link to={`/consult/${consultdata.no}`}>확인</Link></td>
              </tr>
            );
          })}
        </tbody> 
      </table>
      </div>
    );
  }
}

export default Consults;

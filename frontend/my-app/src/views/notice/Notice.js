import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
//import { Link } from 'react-router-dom';

class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
        noticeList: ""
    }
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
    axios.get("http://localhost:8080/noticedetail?id="+params.id)
        .then(res => {
            this.setState({
              noticeList: res.data.list
            })
        })
        .catch(res => console.log(res))
}

delete(){
  const { noticeList } = this.state;
  axios.delete(`http://localhost:8080/notice/`+noticeList.no)
    .then(
      alert("삭제가 되었습니다."),
      document.location.href = "#/notice"
    )
    .catch(function (error){
      console.log(error)
    })
}

update() {
  axios.put(`http://localhost:8080/notice/edit/`+this.state.id,{
    no: this.state.no,
    section: this.state.section,
    title: this.state.title,
    content: this.state.content
  })
    .then(
      alert("수정"),
      document.location.href = "#/notice"
    )
    .catch(function (error){
      console.log(error)
    })
}

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const { noticeList } = this.state;

    return (
      <div>
        <br></br>
        <table width="800" border="1" align="center">
                 <tbody>
                 <tr align="center" height="30">
                  <th> NO </th>
                  <td>{noticeList.no}</td>
                  <th> 작 성 자 </th>
                  <td>{noticeList.empno}</td>
                  <th> 작 성 일 </th>
                  <td>{noticeList.regdate}</td>
                </tr>
                <tr align="center">
                  <th> 구 분 </th>
                  <td>{noticeList.section}</td>
                  <th> 제 목 </th>
                  <td colspan="3">{noticeList.title}</td>
                </tr>
                <tr height="80">
                  <td colspan="6">{noticeList.content}</td>
                </tr>
                 </tbody>
               </table>
               <br></br>
               <footer align="center">
                {/* <Link to={`/noticeUpdate`}><button>수정</button></Link> */}
                  &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={this.goBack}>목록</Button>
                  &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={()=>{this.delete()}}>삭제</Button>
               </footer>
      </div>
    );
  }
}

export default Notice;

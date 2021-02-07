import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './table.css';

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
    const tempStyle2={float:"right"}

    return (
      <div>
        <header>
        <div style={tempStyle2}>
            <button onClick={this.goBack}>뒤로가기</button>
        </div>
          <br></br>
        </header>
        <br></br>
        <table>
                 <tbody>
                   <tr><td>{`NO :`}</td><td><strong>{noticeList.no}</strong></td></tr>
                   <tr><td>{`section :`}</td><td><strong>{noticeList.section}</strong></td></tr>
                   <tr><td>{`title :`}</td><td><strong>{noticeList.title}</strong></td></tr>
                   <tr><td>{`content :`}</td><td><strong>{noticeList.content}</strong></td></tr>
                   <tr><td>{`writer :`}</td><td><strong>{noticeList.empno}</strong></td></tr>
                   <tr><td>{`date :`}</td><td><strong>{noticeList.regdate}</strong></td></tr>
                   <tr><td>{`hits :`}</td><td><strong>{noticeList.hits}</strong></td></tr>
                 </tbody>
               </table>
               <br></br>
               <footer>
                <Link to={`/noticeUpdate`}><button>수정</button></Link>
                  &nbsp;&nbsp;&nbsp;
                <button size="sm" color="danger" onClick={()=>{this.delete()}}>삭제</button>
               </footer>
      </div>
    );
  }
}

export default Notice;

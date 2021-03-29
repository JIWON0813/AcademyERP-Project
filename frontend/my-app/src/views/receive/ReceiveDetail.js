import React, { Component } from "react";
import ApiService from "../../ApiService";
import { Button } from "@material-ui/core";

class ReceiveDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        receiveList: ""
    }
    //this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
  ApiService.getReceiveDetail(params.id)
        .then(res => {
            this.setState({
              receiveList: res.data.list
            })
        })
        .catch(res => console.log(res))
}

delete(){
  const { receiveList } = this.state;
  ApiService.deleteReceive(receiveList.no)
    .then(
      alert("삭제가 되었습니다."),
      document.location.href = "#/receive"
    )
    .catch(function (error){
      console.log(error)
    })
} 

// update() {
//   axios.put(`http://localhost:8080/notice/edit/`+this.state.id,{
//     no: this.state.no,
//     section: this.state.section,
//     title: this.state.title,
//     content: this.state.content
//   })
//     .then(
//       alert("수정"),
//       document.location.href = "#/notice"
//     )
//     .catch(function (error){
//       console.log(error)
//     })
// }

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const { receiveList } = this.state;

    return (
      <div>
        <br></br>
        <table width="800" border="1" align="center">
                 <tbody>
                <tr>
                  <th weight="10"> NO. </th>
                  <td weight="10"> {receiveList.no}</td>
                  <th weigth="20"> 학생명 </th> 
                  <td weigth="20"> {receiveList.student}</td>
                  <th weigth="20"> 번호 </th>
                  <td weigth="20">{receiveList.hp}</td>
                </tr>
                <tr>
                  <th> 강의명 </th>
                  <td> {receiveList.lecture}</td>
                  <th> 지점 </th>  
                  <td colspan="3">{receiveList.branch}</td>
                </tr>
                <tr>
                  <th> 수납날짜 </th>
                  <td>{receiveList.date}</td>
                  <th> 수납금액 </th>
                  <td>{receiveList.pay}</td>
                  <th> 미납액 </th>
                  <td>{receiveList.unpaid}</td> 
                </tr>
                <tr>
                  <th> 수납여부 </th> 
                  <td colspan="5">{receiveList.status}</td>
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

export default ReceiveDetail;

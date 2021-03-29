//---------------------------------
// 제목 : 상세보기 - 비용관리(직원-개인)
// 파일명 : CostDetail.js
// 작성자 : 최인아
//---------------------------------
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ApiService from "../../ApiService";

class CostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        costList: ""
    }
    //this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
    ApiService.getCostDetail(params.id)
        .then(res => {
            this.setState({
              costList: res.data.list
            })
        })
        .catch(res => console.log(res))
}

delete(){
  const { costList } = this.state;
  ApiService.deleteCost(costList.no)
    .then(
      alert("삭제가 되었습니다."),
      document.location.href = "#/cost"
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
    const { costList } = this.state;

    return (
      <div>
        <br></br>
        <table width="800" border="1" align="center">
                 <tbody>
                <tr align="center">
                  <th> NO. </th>
                  <td>{costList.no}</td>
                  <th> 구 분 </th>
                  <td>{costList.section}</td>
                  <th> 사용날짜 </th>
                  <td>{costList.date}</td>
                </tr>
                <tr height="80">
                  <td colspan="6">{costList.reason}</td>
                </tr>
                <tr align="center">
                  <th> 총비용 </th>
                  <td colspan="5">{costList.allcost}</td>
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

export default CostDetail;

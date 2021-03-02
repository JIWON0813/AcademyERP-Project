//---------------------------------   
// 제목 : 메인 - 수납관리(직원-재무)
// 파일명 : Receive.js
// 작성자 : 최인아
//---------------------------------
import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './table.css';
import ReceiveInsert from "./ReceiveInsert";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

class Receive extends Component {
  constructor(props) {
    super(props)
    this.state = {
        receiveList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      receiveList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/receive")
        .then(res => {
            this.setState({
              receiveList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { receiveList } = this.state;

    return (
      <div>
        <header>
          <ReceiveInsert stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        <br></br>
        <table>
        <thead>
          <tr>
            <td><strong> NO. </strong></td>
            <td><strong> 학생명 </strong></td>
            <td><strong> 강의명 </strong></td>
            <td><strong> 수납날짜 </strong></td>
            <td><strong> 수납금액 </strong></td>
            <td><strong> 미납액 </strong></td>
            <td><strong> 수납여부 </strong></td> 
            <td><strong> 번호 </strong></td>
            <td><strong> 지점 </strong></td>
          </tr>
        </thead>
        <tbody>
         {receiveList&&receiveList.map((receivedata) => {
            return (
            <tr class="default">
                <td class="default">{receivedata.no}</td>
                <td class="default"><Link to={`/receivedetail/${receivedata.no}`}>{receivedata.student}</Link></td>
                <td class="default">{receivedata.lecture}</td>
                <td class="default">{receivedata.date}</td>
                <td class="default">{receivedata.pay}</td>
                <td class="default">{receivedata.unpaid}</td>
                <td class="default">{receivedata.status}</td>
                <td class="default">{receivedata.hp}</td>
                <td class="default">{receivedata.branch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <div>
        <Pagination count={10} color="primary" />
      </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Receive);

//---------------------------------
// 제목 : 메인 - 비용관리(직원-개인)
// 파일명 : Cost.js
// 작성자 : 최인아
//---------------------------------
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './table.css';
import CostInsert from "./CostInsert";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PaymentInsert from "../payment/insert/insert";
import ApiService from "../../ApiService";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

class Cost extends Component {
  constructor(props) {
    super(props)
    this.state = {
        costList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      costList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
  ApiService.getConsults()
        .then(res => {
            this.setState({
              costList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { costList } = this.state;
    const tempStyle={float:"left"}

    return (
      <div>
        <header>
        <div style={tempStyle}>
          <PaymentInsert kind={costList} data={costList}/>
        </div>
          <CostInsert stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        <br></br>
        <table>
        <thead>
          <tr>
            <td><strong> NO. </strong></td>
            <td><strong> 구분 </strong></td>
            {/* <td><strong> 사유 </strong></td> */}
            <td><strong> 총비용 </strong></td>
            <td><strong> 사용날짜 </strong></td>
            <td><strong> 승인상태 </strong></td>
          </tr>
        </thead>
        <tbody>
         {costList&&costList.map((costdata) => {
            return (
            <tr class="default">
                <td class="default">{costdata.no}</td>
                <td class="default"><Link to={`/costdetail/${costdata.no}`}>{costdata.section}</Link></td>
                {/* <td class="default">{costdata.reason}</td> */}
                <td class="default">{costdata.allcost}</td>
                <td class="default">{costdata.date}</td>
                <td class="default">{costdata.state}</td>
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

export default withStyles(useStyles)(Cost);

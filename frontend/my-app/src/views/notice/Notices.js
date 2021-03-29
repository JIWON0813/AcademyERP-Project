import React, { Component } from "react";
import ApiService from "../../ApiService";
import { Link } from 'react-router-dom';
import './table.css';
import NoticeWrite from "./NoticeWrite";
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

class Notices extends Component {
  constructor(props) {
    super(props)
    this.state = {
        noticeList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      noticeList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
    ApiService.getNotices()
        .then(res => {
            this.setState({
              noticeList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { noticeList } = this.state;

    return (
      <div>
        <header>
        <NoticeWrite stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        <br></br>
        <table>
        <thead>
          <tr>
            <td><strong> NO.</strong></td>
            <td><strong> 제 목 </strong></td>
            <td><strong> 작성자 </strong></td>
            <td><strong> 작성날짜 </strong></td>
            {/* <td>HITS</td> */}
          </tr>
        </thead>
        <tbody>
         {noticeList&&noticeList.map((noticedata) => {
            return (
            <tr class="default">
                <td class="default">{noticedata.no}</td>
                <td class="default"> [{noticedata.section}]<Link to={`/notice/${noticedata.no}`}>{noticedata.title}</Link></td>
                <td class="default">{noticedata.emp}</td>
                <td class="default">{noticedata.regdate}</td>
                {/* <td class="default">{noticedata.hits}</td> */}
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

export default withStyles(useStyles)(Notices);

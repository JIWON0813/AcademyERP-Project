import React, {Component} from "react";
import axios from "axios";
import './table.css';
import StatementAdd from "./StatementAdd";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import StatementUpdate from "./StatementUpdate";
import StatementDelete from "./StatementDelete";
import ApiService from "../../ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class Statement extends Component {
  constructor(props) {
    super(props)
    let session_no = window.sessionStorage.getItem('no');
    this.state = {
      ItemList: "",
      searchKeyword: "",
      condition:"",
      user: session_no,
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  stateRefresh() {
    this.setState({
      ItemList: "",
    });
    this.getApi();
    this.getApi();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  getApi() {
    ApiService.getStatement(this.state.user)
      .then(res => {
        this.setState({
          ItemList: res.data.message,
        })
      })
      .catch(res => console.log(res))

  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.getApi();
    }
  };
  handleSubmit = (e) => {
    e.preventDefault()
  }

  conditionSelect = (e) => {
    this.setState({
      condition:e.target.value
    })
  }

  render() {
    const {ItemList} = this.state;

    return (
      <div>
        <header>

          <Grid container justify="flex-end">
            <StatementAdd stateRefresh={this.stateRefresh}/>
          </Grid>


        </header>
        <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
        <table>
          <thead>
          <tr>
            <td>사업장</td>
            <td>작성자(사번)</td>
            <td>전표번호</td>
            <td>증빙일</td>
            <td>전표일</td>
            <td>적요</td>
            <td>삭제</td>
          </tr>
          </thead>
          <tbody>

          {ItemList && ItemList.map((itemdata, insertIndex) => {
            return (
              <tr key={insertIndex}>
                <td>{itemdata.workplace}</td>
                <td>{itemdata.employee}</td>
                <td><StatementUpdate stateRefresh={this.stateRefresh} id={itemdata.no}/></td>
                <td>{itemdata.proofDate}</td>
                <td>{itemdata.reportingDate}</td>
                <td>{itemdata.allNote}</td>
                <td><StatementDelete stateRefresh={this.stateRefresh} id={itemdata.no}/></td>
              </tr>
            );
          })}
          </tbody>
        </table>
        {ItemList.length === 0 &&
        <div align="center">
          <p>검색결과가 없습니다</p>
          <hr></hr>
        </div>
        }
      </div>
    );
  }
}

export default Statement;

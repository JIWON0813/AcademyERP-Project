import React, {Component} from "react";
import axios from "axios";
import {CButton, CForm, CInput, CSelect} from "@coreui/react";
import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import './table.css';
import PayList from "./PayList";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class SearchStudent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchKeyword: "",
      studentList:"",
      student:"",
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  stateRefresh() {
    this.setState({
      searchKeyword: "",
      studentList:"",
      student:"",
    });
    this.getApi();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  getApi() {
    console.log("호출")
    console.log(this.state.searchKeyword)
    axios.get("http://localhost:8080/api/students/user?name="+this.state.searchKeyword)
      .then(res => {
        this.setState({
          studentList: res.data.studentList,
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
    this.getApi();
  }
  conditionSelect = (e) => {
    this.setState({
      student:e.target.value
    })

  }
  render() {
    const { studentList } =  this.state;

    return (
      <div>
        <header>
          <CForm inline onSubmit={this.handleSubmit.bind(this)}>
            <CSelect custom id="branch">
              <option value="name">학생이름</option>
            </CSelect>
            &nbsp;&nbsp;
            <CInput
              className="mr-sm-2"
              placeholder="이름 입력"
              size="sm"
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
            <CButton color="dark" variant="outline" className="my-2 my-sm-0" onClick={(e) => {
              this.getApi()
            }}>검색</CButton>
          </CForm>

        </header>
        <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
        <table>
          <thead>
          <tr>
            <td>no</td>
            <td>name</td>
            <td>hp</td>
            <td>email</td>
            <td>birth</td>
            <td>address</td>
            <td>lecture</td>
            <td>gender</td>
            <td>regdate</td>
          </tr>
          </thead>
          <tbody>

          {studentList&&studentList.map((itemdata, insertIndex) => {
            return (
              <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td><PayList stateRefresh={this.stateRefresh} id={itemdata.no} itemdata={itemdata}/></td>
                <td>{itemdata.hp}</td>
                <td>{itemdata.email}</td>
                <td>{itemdata.birth}</td>
                <td>{itemdata.address}</td>
                <td>{itemdata.lecture}</td>
                <td>{itemdata.gender}</td>
                <td>{itemdata.regdate}</td>

              </tr>
            );
          })}
          </tbody>
        </table>
        {studentList.length === 0 &&
        <div align="center">
          <p>검색결과가 없습니다</p>
          <hr></hr>

          <payList/>
        </div>
        }
      </div>
    );
  }
}

export default SearchStudent;

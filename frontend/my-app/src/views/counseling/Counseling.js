import React, {Component} from "react";
import axios from "axios";
import './table.css';
import {CForm, CSelect} from "@coreui/react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, IconButton} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import CounselingRecord from "./CounselingRecord";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class Counseling extends Component {

  constructor(props) {
    super(props)
    let session_no=window.sessionStorage.getItem('no');
    this.state = {
      studentList: "",
      lectureList: "",
      teacher: session_no,
      lecture: "",
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  stateRefresh() {
    this.setState({
      studentList: "",
    });
    this.getCounseling();
  }


  getApi() {
    axios.get("http://localhost:8080/lecture/teacher/" + this.state.teacher)
      .then(res => {
        this.setState({
          lectureList: res.data.lectureList,
        })
      })
      .catch(res => console.log(res))
  }

  getCounseling() {
    axios.get("http://localhost:8080/api/students/" + this.state.lecture)
      .then(res => {
        this.setState({
          studentList: res.data.studentList,
        })
      })
      .catch(res => console.log(res))
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  lectureSelect = (e) => {
    this.setState({
      lecture: e.target.value,
      studentList: "",
    })
    axios.get("http://localhost:8080/api/students/"+e.target.value)
      .then(res => {
        this.setState({
          studentList: res.data.studentList,
        })
      })
      .catch(res => console.log(res))
  }


  handleFormSubmit(e) {
    e.preventDefault()
    if (this.state.disabled) {
      this.setState({
        disabled: false,
      })
    } else {
      if (this.state.scoreArray.length > 0) {
        this.editScore()
        this.setState({
          studentList: "",
        })
        alert("등록되었습니다.");
        this.stateRefresh();
      }
    }
  }


  render() {
    const {studentList} = this.state;
    const {lectureList} = this.state;
    return (
      <div>
        <header>
          <CForm inline>
            <CSelect custom id="lecture" onChange={this.lectureSelect} value={this.state.lecture}>
              <option value="0">강의</option>
              {lectureList && lectureList.map((itemdata, insertIndex) => {
                return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
              })}
            </CSelect>
          </CForm>

          <Grid container justify="flex-end">
            <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
          </Grid>
        </header>
        <table>
          <thead>
          <tr>
            <td>NO</td>
            <td>학생명</td>
            <td>HP</td>
            <td>Email</td>
            <td>상담 기록</td>
          </tr>

          </thead>
          <tbody>

          {studentList && studentList.map((itemdata, insertIndex) => {
            return (
              <tr>
                <td key={insertIndex}>{itemdata.no}</td>
                <td>{itemdata.name}</td>
                <td>{itemdata.hp}</td>
                <td>{itemdata.email}</td>
                <td width="10%"><CounselingRecord
                  stateRefresh={this.stateRefresh}
                  id={itemdata.no}
                  name={itemdata.name}
                  lecture={this.state.lecture}
                />
                </td>
              </tr>
            );
          })}

          </tbody>
        </table>
        {studentList.length === 0 &&
        <div align="center">
          <p>검색결과가 없습니다.</p>
          <hr></hr>
        </div>
        }

      </div>

    );
  }
}

export default Counseling;

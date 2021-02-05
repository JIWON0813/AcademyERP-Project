import React, {Component} from "react";
import axios from "axios";
import './table.css';
import {CCol, CForm, CSelect} from "@coreui/react";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, IconButton} from "@material-ui/core";
import Exam from "../exam/Exam";
import ScoreEdit from "./ScoreEdit";
import RefreshIcon from '@material-ui/icons/Refresh';
import ScoreTotal from "./ScoreTotal";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class Score extends Component {

  constructor(props) {
    super(props)
    let session_no=window.sessionStorage.getItem('no');
    this.state = {
      studentList: "",
      lectureList: "",
      teacher: session_no,
      lecture: "",
      examList: "",
      scoreArray: [],
      disabled: true,
      title: "수정",
      totalWeight: "",
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.editScore = this.editScore.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  stateRefresh() {
    this.setState({
      studentList: "",
      scoreArray: [],
      examList: "",
      totalWeight: "",
      disabled: true,
    });
    this.getLecture();
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

  getLecture() {
    axios.get("http://localhost:8080/api/students/" + this.state.lecture)
      .then(res => {
        this.setState({
          studentList: res.data.studentList,
        })
      })
      .catch(res => console.log(res))
    axios.get("http://localhost:8080/exam?lecture=" + this.state.lecture)
      .then(res => {
        this.setState({
          examList: res.data.list,
          totalWeight: res.data.totalWeight,
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
      scoreArray: [],
      examList: "",
      totalWeight: "",
      disabled: true,
    })
    axios.get("http://localhost:8080/api/students/" + e.target.value)
      .then(res => {
        this.setState({
          studentList: res.data.studentList,
        })
      })
      .catch(res => console.log(res))
    axios.get("http://localhost:8080/exam?lecture=" + e.target.value)
      .then(res => {
        this.setState({
          examList: res.data.list,
          totalWeight: res.data.totalWeight,
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
          scoreArray: [],
          examList: "",
          totalWeight: "",
          disabled: true,
        })
        alert("등록되었습니다.");
        this.stateRefresh();
      }
    }
  }


  editScore() {
    axios({
      url: 'http://localhost:8080/score',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        scoreArray: this.state.scoreArray,
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  setData(scoreArray) {
    let no
    let exam
    let lecture
    let score
    let student
    let regdate = new Date();
    let array = this.state.scoreArray;


    scoreArray.map((scoreList) => {
      exam = scoreList.exam;
      lecture = scoreList.lecture;
      score = scoreList.score;
      student = scoreList.student;
      no = scoreList.no;
    })

    let index = array.findIndex(isScore);
    function isScore(element) {
      if (element.exam === exam && element.lecture === lecture && element.student === student) {
        return true;

      }
    }

    if (score === "") {
      score = 0;
    }
    if (index > -1) {
      array[index].score = score;
      array[index].regdate = regdate;
    } else {
      if (no === "") {
        array.push({
          student: student,
          lecture: lecture,
          score: score,
          exam: exam,
          regdate: regdate,
        })
      } else {
        array.push({
          student: student,
          lecture: lecture,
          score: score,
          exam: exam,
          regdate: regdate,
          no: no,
        })
      }
    }

    this.setState({
      scoreArray: array,
    })
    console.log(array)
  }

  render() {
    const {studentList} = this.state;
    const {lectureList} = this.state;
    const {examList} = this.state
    let name = "수정"
    if (this.state.disabled) {
      name = "수정"
    } else {
      name = "수정완료"
    }
    return (
      <div>
        <header>
          <CForm inline>
            <CSelect custom id="lecture" onChange={this.lectureSelect} value={this.state.lecture}>
              <option value="">강의</option>
              {lectureList && lectureList.map((itemdata, insertIndex) => {
                return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
              })}
            </CSelect>
            <Grid container justify="flex-end">
              <Exam stateRefresh={this.stateRefresh} teacher={this.state.teacher}/>
            </Grid>
          </CForm>

          <Grid container justify="flex-end">
            <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
          </Grid>
        </header>
        <table>
          <thead>
          <tr>
            <td>NO</td>
            <td width="10%">학생명</td>
            {examList && examList.map((itemdata) => {
              return (<td>{itemdata.name}&nbsp;({itemdata.weight}%)</td>);
            })}
            <td bgcolor="#eee8aa">총점&nbsp;({this.state.totalWeight}%)</td>
          </tr>
          <tr>

          </tr>
          </thead>
          <tbody>

          {studentList && studentList.map((itemdata, insertIndex) => {
            return (
              <tr>
                <td key={insertIndex}>{itemdata.no}</td>
                <td>{itemdata.name}</td>
                {
                  examList && examList.map((examdata) => {
                    return (
                      <td key={examdata.no}>
                        <ScoreEdit
                          id={itemdata.no}
                          lecture={this.state.lecture}
                          exam={examdata.no}
                          setData={this.setData}
                          disabled={this.state.disabled}/>
                      </td>);
                  })
                }
                <td bgcolor="#eee8aa"><ScoreTotal
                  id={itemdata.no}
                  lecture={this.state.lecture}/></td>
              </tr>
            );
          })}

          </tbody>
        </table>
        {studentList.length === 0 &&
        <div align="center">
          <p>검색결과가 없습니다</p>
          <hr></hr>
        </div>
        }
        <br/>
        <Grid container justify="flex-end">
          {studentList.length > 0 &&
          <CCol md="1">
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>{name}</Button>
          </CCol>
          }
          {this.state.disabled === false &&
          <Button variant="contained" onClick={this.stateRefresh}>취소</Button>
          }
        </Grid>
        <br/>
      </div>

    );
  }
}

export default Score;

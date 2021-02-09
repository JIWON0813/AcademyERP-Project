import React, {Component} from "react";
import axios from "axios";
import './table.css';
import LectureAdd from "./LectureAdd";
import Lecture from "./Lecture";
import {CButton, CForm, CInput, CSelect} from "@coreui/react";
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Room from "../room/Room";
import {Grid, IconButton} from "@material-ui/core";
import Part from "../part/Part";
import RefreshIcon from "@material-ui/icons/Refresh";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class Lectures extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ItemList: "",
      pagingList:"",
      searchKeyword: "",
      branchList:"",
      findBranch:"",
      condition:"",
      currentPageNo:1,
      recordsPerPage:5

    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    this.getApi(this.state.searchKeyword,this.state.currentPageNo);
    this.getBranch();
  }

  stateRefresh() {
    this.setState({
      ItemList: "",
      branchList:"",
      pagingList:"",
    });
    this.getApi(this.state.searchKeyword,this.state.currentPageNo);
    this.getBranch();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  getApi(searchKeyword,currentPageNo) {
    console.log(searchKeyword)
    axios.get("http://localhost:8080/lecture?branch="+this.state.findBranch+"&condition="+this.state.condition+"&keyword=" + searchKeyword+"&currentPageNo="+currentPageNo+"&recordsPerPage="+this.state.recordsPerPage)
      .then(res => {
        this.setState({
          ItemList: res.data.message,
          pagingList : res.data.paging,
        })
      })
      .catch(res => console.log(res))

  }

  getBranch = () => {
    axios.get("http://localhost:8080/lecture/branches")
      .then(res => {
        this.setState({
          branchList: res.data.list
        })
      })
      .catch(res => console.log(res))
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.getApi(this.state.searchKeyword,this.state.currentPageNo);
    }
  };
  handleSubmit = (e) => {
    e.preventDefault()
  }

  branchSelect = (e) => {
    this.setState({
      findBranch: e.target.value
    })
  }
  conditionSelect = (e) => {
    this.setState({
      condition:e.target.value
    })
  }

  render() {
    const {ItemList} = this.state;
    const {pagingList} = this.state;
    const {branchList} = this.state;

    const handleChange = (event, value) => {
      this.getApi(this.state.searchKeyword,value)
      // this.getApi(value);
      this.setState({
        currentPageNo : value
      })
    };

    return (
      <div>
        <header>
          <CForm inline onSubmit={this.handleSubmit.bind(this)}>
            <CSelect custom id="branch" onChange={this.branchSelect} value={this.state.findBranch}>
              <option value="">지점</option>
              {branchList && branchList.map((itemdata, insertIndex) => {
                return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
              })}
            </CSelect>
            <CSelect custom id="branch" onChange={this.conditionSelect} value={this.state.condition}>
              <option value="">검색조건</option>
              <option value="name">강의명</option>
              <option value="instructor">강사</option>
              <option value="part">분야</option>

            </CSelect>
            &nbsp;&nbsp;
            <CInput
              className="mr-sm-2"
              placeholder="Search"
              size="sm"
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
            <CButton color="dark" variant="outline" className="my-2 my-sm-0" onClick={(e) => {
              this.getApi(this.state.searchKeyword,this.state.currentPageNo)
            }}>검색</CButton>
          </CForm>

          <Grid container justify="flex-end">
            <LectureAdd stateRefresh={this.stateRefresh}/>
            <Room stateRefresh={this.stateRefresh}/>
            <Part stateRefresh={this.stateRefresh}/>
          </Grid>


        </header>
        <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
        <table>
          <thead>
          <tr>
            <td>NO</td>
            <td>강의명</td>
            <td>강사</td>
            <td>수강료</td>
            <td>현재인원/정원수</td>
            <td>강의실</td>
            <td>개강일</td>
            <td>종강일</td>
            <td>요일</td>
            <td>시작시간</td>
            <td>종료시간</td>
            <td>분야</td>
            <td>지점</td>
          </tr>
          </thead>
          <tbody>

          {ItemList && ItemList.map((itemdata, insertIndex) => {
            return (
              <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td><Lecture stateRefresh={this.stateRefresh} id={itemdata.no}/></td>
                <td>{itemdata.instructor}</td>
                <td>{itemdata.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td style={{ textAlign: 'center' }}>{itemdata.currentStudents} / {itemdata.students}</td>
                <td>{itemdata.classRoom}</td>
                <td>{itemdata.start_date}</td>
                <td>{itemdata.end_date}</td>
                <td>{itemdata.day}</td>
                <td>{itemdata.start_time}</td>
                <td>{itemdata.end_time}</td>
                <td>{itemdata.field}</td>
                <td>{itemdata.office}</td>
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
        {ItemList.length !== 0 &&
        <div className={useStyles.root}>
          <Pagination count={pagingList.lastPage} onChange={handleChange} />
        </div>
        }
      </div>
    );
  }
}

export default Lectures;

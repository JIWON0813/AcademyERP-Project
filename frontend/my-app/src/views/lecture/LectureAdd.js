import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,} from "@material-ui/core";
import {CSelect} from '@coreui/react'
const styles = theme => ({
    hidden: {
    display: 'none'
  }

});

class LectureAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      teacher: '',
      price: '',
      students: '',
      room: '',
      start_date: '',
      end_date: '',
      day: '',
      start_time: '',
      end_time: '',
      part: '',
      branch: ''

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addLecture = this.addLecture.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.branchSelect = this.branchSelect.bind(this);
  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.addLecture()
    this.setState({
      name: '',
      teacher: '',
      price: '',
      students: '',
      room: '',
      start_date: '',
      end_date: '',
      day: '',
      start_time: '',
      end_time: '',
      part: '',
      branch: ''
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
    /*this.props.history.push('/lecture')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addLecture() {
    axios({
      url: 'http://localhost:8080/api2/lecture',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        teacher: this.state.teacher,
        price: this.state.price,
        students: this.state.students,
        room: this.state.room,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        day: this.state.day,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        part: this.state.part,
        branch: this.state.branch
      }
    })
      .then(function (response){
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      })
  }
  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {

    this.setState({
      name: '',
      teacher: '',
      price: '',
      students: '',
      room: '',
      start_date: '',
      end_date: '',
      day: '',
      start_time: '',
      end_time: '',
      part: '',
      branch: '',
      open: false
    })
  }

/*  branchSelect = (e) => {        //dep변경
    this.setState({
      branch: e.target.value
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8080/api2/),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
      console.log(res);
      this.setState({
        ItemList: res.data.list
      })
    }).catch(res => console.log(res))
  }*/

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogTitle>클래스 추가</DialogTitle>
          <DialogContent>
            <TextField label="지점" type="text" name="branch" value={this.state.branch} onChange={this.handleValueChange}/><br/>
          {/*  <CSelect custom id="branch" onChange={this.branchSelect} value={this.state.branch}>
              <option value="">지점</option>
              {branchList&&branchList.map((itemdata, insertIndex) => {
                return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
              })}
            </CSelect><br/>*/}
            <TextField label="부서" type="text" name="part" value={this.state.part} onChange={this.handleValueChange}/><br/>
            <TextField label="강의명" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
            <TextField label="강사" type="text" name="teacher" value={this.state.teacher} onChange={this.handleValueChange}/><br/>
            <TextField label="가격" type="text" name="price" value={this.state.price} onChange={this.handleValueChange}/><br/>
            <TextField label="정원수" type="text" name="students" value={this.state.students}
                             onChange={this.handleValueChange}/><br/>
            <TextField label="강의실" type="text" name="room" value={this.state.room} onChange={this.handleValueChange}/><br/>
            <label>개강날짜 :&nbsp;</label><TextField type="date" name="start_date" value={this.state.start_date}
                               onChange={this.handleValueChange}/><br/>
            <label>종강날짜 :&nbsp;</label><TextField type="date" name="end_date" value={this.state.end_date}
                             onChange={this.handleValueChange}/><br/>
            <TextField label="요일" type="text" name="day" value={this.state.day} onChange={this.handleValueChange}/><br/>
            <TextField title="시작시간" type="time" name="start_time" value={this.state.start_time}
                               onChange={this.handleValueChange}/> <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <TextField title="종료시간" type="time" name="end_time" value={this.state.end_time}
                             onChange={this.handleValueChange}/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(LectureAdd)



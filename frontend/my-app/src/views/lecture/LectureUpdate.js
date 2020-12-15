import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

class LectureUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.ItemList.name,
      teacher: this.props.ItemList.teacher,
      price: this.props.ItemList.price,
      students: this.props.ItemList.students,
      room: this.props.ItemList.room,
      start_date: this.props.ItemList.start_date,
      end_date: this.props.ItemList.end_date,
      day: this.props.ItemList.day,
      start_time: this.props.ItemList.start_time,
      end_time: this.props.ItemList.end_time,
      part: this.props.ItemList.part,
      branch: this.props.ItemList.branch
    }


    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateLecture = this.updateLecture.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.updateLecture()
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
    alert("수정되었습니다.");
    this.props.stateRefresh();
    /*this.props.history.push('/lecture')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateLecture() {
    console.log(this.state.name);
      console.log(this.state.teacher);
        console.log(this.state.price);
          console.log(this.state.students);
            console.log(this.state.room);
              console.log( this.state.start_date);
                console.log( this.state.end_date);
                  console.log( this.state.day);
                    console.log( this.state.start_time);
                      console.log(this.state.end_time);
                        console.log(this.state.part);
                          console.log(this.state.branch);
    axios({
      url: 'http://localhost:8080/api2/lecture/edit/' + this.props.ItemList.no,
      method: "PUT",
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
      open: false
    })
  }



  render() {
    let ItemList = this.props.ItemList;
    console.log(ItemList);

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          수정
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>클래스 수정</DialogTitle>
          <DialogContent>
            <TextField label="강의명" type="text" name="name" defaultValue={ItemList.name} onChange={this.handleValueChange}/><br/>
            <TextField label="강사" type="text" name="teacher" defaultValue={ItemList.teacher} onChange={this.handleValueChange}/><br/>
            <TextField label="가격" type="text" name="price" defaultValue={ItemList.price} onChange={this.handleValueChange}/><br/>
            <TextField label="정원수" type="text" name="students" defaultValue={ItemList.students}
                       onChange={this.handleValueChange}/><br/>
            <TextField label="강의실" type="text" name="room" defaultValue={ItemList.room} onChange={this.handleValueChange}/><br/>
            <label>개강날짜 :&nbsp;</label><TextField type="date" name="start_date" defaultValue={ItemList.start_date}
                                                  onChange={this.handleValueChange}/><br/>
            <label>종강날짜 :&nbsp;</label><TextField type="date" name="end_date" defaultValue={ItemList.end_date}
                                                  onChange={this.handleValueChange}/><br/>
            <TextField label="요일" type="text" name="day" defaultValue={ItemList.day} onChange={this.handleValueChange}/><br/>
            <TextField title="시작시간" type="time" name="start_time" defaultValue={ItemList.start_time}
                       onChange={this.handleValueChange}/> <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <TextField title="종료시간" type="time" name="end_time" defaultValue={ItemList.end_time}
                       onChange={this.handleValueChange}/><br/>
            <TextField label="부서" type="text" name="part" defaultValue={ItemList.part} onChange={this.handleValueChange}/><br/>
            <TextField label="지점" type="text" name="branch" defaultValue={ItemList.branch} onChange={this.handleValueChange}/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(LectureUpdate)

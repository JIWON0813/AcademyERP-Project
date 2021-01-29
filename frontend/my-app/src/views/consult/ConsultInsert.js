//---------------------------
// 제목 : 상담 기록 작성페이지
// 파일명 : ConsultInsert.js
// 작성자 : 최인아
// 작성일 : 
//---------------------------
import React, { Component } from 'react';
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles, Grid} from "@material-ui/core";
import {CCol, CFormGroup, CInputCheckbox, CLabel} from '@coreui/react';

const styles = theme => ({
    hidden: {
    display: 'none'
  }
});

class ConsultInsert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      name: '',
      hp: '',
      schedule: '',
      memo: '',
      // regdate:'',
      route:[],
      writer: ''

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.insertConsult = this.insertConsult.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.insertConsult()
    this.setState({
      name: '',
      hp: '',
      schedule: '',
      memo:'',
      // regdate:'',
      route:[],
      writer: ''
    })
    console.log(this.state.route);
    alert("등록되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  insertConsult() {
    axios({
      url: 'http://localhost:8080/consult',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        hp: this.state.hp,
        schedule: this.state.schedule,
        memo: this.state.memo,
        // regdate: this.state.regdate,
        route: this.state.route.toString(),
        writer: this.state.writer
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
      hp: '',
      schedule: '',
      memo: '',
      // regdate: '',
      route: [],
      writer: '',
      open: false
    })
    this.props.stateRefresh();
  }

  checkboxChange = (e) => {
    const route = this.state.route
    let index
    if (e.target.checked) {
      route.push(e.target.value)
    } else {
      index = route.indexOf(e.target.value)
      route.splice(index, 1)
    }
    this.setState({
      route: route,
      isChecked: !this.state.isChecked,
    })
  }



  render() {
    return (
      <div>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>입력</Button>
        </Grid>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>입력창</DialogTitle>
          <DialogContent>
          <CFormGroup row>
              <CCol md="9">
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox1" name="route" value={"CALL"} 
                    onChange={this.checkboxChange}/>
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1" checked={this.state.isChecked}>CALL</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox2" name="route" value={"ONLINE"} 
                    onChange={this.checkboxChange}/>
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2" checked={this.state.isChecked}>ONLINE</CLabel>
                  </CFormGroup>
              </CCol>
            </CFormGroup>
            <TextField label="성명" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
            <TextField label="전화번호" type="text" name="hp" value={this.state.hp} onChange={this.handleValueChange}/><br/>
            <TextField type="date" name="schedule" value={this.state.schedule} onChange={this.handleValueChange}/><br/>
            <TextField label="메모" type="textarea" name="memo" value={this.state.memo} onChange={this.handleValueChange}/><br/>
            <TextField label="작성자" type="text" name="writer" value={this.state.writer} onChange={this.handleValueChange}/><br/>
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


export default withStyles(styles)(ConsultInsert)



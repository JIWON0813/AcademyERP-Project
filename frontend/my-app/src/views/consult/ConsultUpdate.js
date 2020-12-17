import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import {CCol, CFormGroup, CInput, CInputCheckbox, CLabel } from "@coreui/react";

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

class ConsultUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.ConsultList.name,
      hp: this.props.ConsultList.hp,
      schedule: this.props.ConsultList.schedule,
      memo: this.props.ConsultList.memo,
      // route: this.props.ConsultList.route,
      writer: this.props.ConsultList.writer
    }


    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateConsult = this.updateConsult.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    // this.checkboxChange = this.checkboxChange.bind(this);

  }



  handleFormSubmit(e) {
    e.preventDefault()
    this.updateConsult()
    this.setState({
      name: '',
      hp: '',
      schedule: '',
      memo: '',
      // route: '',
      writer: ''

    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateConsult() {
    console.log(this.state.name);
    console.log(this.state.hp);
    console.log(this.state.schedule);
    console.log(this.state.memo);
    // console.log(this.state.route);
    console.log(this.state.writer);
    axios({
      url: 'http://localhost:8080/api2/consult/edit/' + this.props.ConsultList.no,
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        hp: this.state.hp,
        schedule: this.state.schedule,
        memo: this.state.memo,
        // route: this.state.route.toString(),
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
      open: false
    })
  }

  // checkboxChange = (e) => {
  //   const route=this.state.route
  //   let index
  //   if (e.target.checked) {
  //     route.push(e.target.value)
  //   } else {
  //     index = route.indexOf(e.target.value)
  //     route.splice(index, 1)
  //   }
  //   this.setState({route:route})
  // }



  render() {
    let ConsultList = this.props.ConsultList;
    let route = this.state.route;
    console.log(ConsultList);

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          수정
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>상담 수정</DialogTitle>
          <DialogContent>
          {/* <CFormGroup row>
              <CCol md="9">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox1" name="route" value={"CALL"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={route.includes("CALL")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">CALL</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox2" name="route" value={"ONLINE"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={route.includes("ONLINE")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">ONLINE</CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup> */}
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="name">성명</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="name" placeholder="성명" defaultValue={ConsultList.name} onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hp">전화번호</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="hp" placeholder="전화번호" defaultValue={ConsultList.hp} onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="schedule">상담날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" name="schedule" placeholder="상담날짜" defaultValue={ConsultList.schedule} onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="memo">상담내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="meom" placeholder="상담내용" defaultValue={ConsultList.memo} onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="wrtier">작성자</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="writer" placeholder="작성자" defaultValue={ConsultList.writer} onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
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


export default withStyles(styles)(ConsultUpdate)

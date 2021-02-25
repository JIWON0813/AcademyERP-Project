import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles,} from "@material-ui/core";
import {CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CFormText, CInput, CLabel, CRow} from '@coreui/react'
import StatementDetailAdd from "./StatementDetailAdd";

const styles = theme => ({
  hidden: {
    display: 'none'
  }

});


class StatementAdd extends React.Component {
  constructor(props) {
    super(props);
    let session_no=window.sessionStorage.getItem('no');
    let session_branch=window.sessionStorage.getItem('branch');
    this.state = {
      workplace: "1000",
      employee: session_no,
      branch: session_branch,
      allNote:"",
      proofDate:'',
      reportingDate :'',
      list:'',

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.createStatement = this.createStatement.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.createStatement()
    this.setState({
      workplace: "1000",
      allNote:"",
      proofDate:'',
      reportingDate :'',
      list:'',
    })
    alert("등록되었습니다.");
    this.handleClose();
  }

  createStatement() {
    axios({
      url: 'http://localhost:8080/statement',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        workplace: this.state.workplace,
        employee: this.state.employee,
        branch: this.state.branch,
        allNote:this.state.allNote,
        proofDate: this.state.proofDate,
        reportingDate : this.state.reportingDate,
        list:this.state.list,
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
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
      workplace: "1000",
      allNote:"",
      proofDate:'',
      reportingDate :'',
      list:'',
      open: false
    })
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
   this.setState(nextState);
  }

  setData = (info) => {
    console.log(info)
    this.setState({
      list:info,
    })
  }
  render() {
    return (
      <div>
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        <CButton variant="outline" color="primary" onClick={this.handleClickOpen}>
          전표생성
        </CButton>
        </CCol>

        <Dialog open={this.state.open} onClose={this.handleClose} maxWidth={true}>
          <DialogTitle>전표생성</DialogTitle>
          <DialogContent>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    기본 정보
                  </CCardHeader>
                  <CCardBody>
            <CFormGroup row className="my-0">
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="workplace">사업장</CLabel>
                  <CInput id="workplace" value={this.state.workplace} disabled={true} />
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="branch">지점코드</CLabel>
                  <CInput id="branch" value={this.state.branch} disabled={true} />
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="employee">작성자(사번)</CLabel>
                  <CInput id="employee" value={this.state.employee} disabled={true}/>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="reportingDate">작성일</CLabel>
                  <CInput id="reportingDate" type="date" name="reportingDate"
                          value={this.state.reportingDate}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="proofDate">증빙일</CLabel>
                  <CInput id="proofDate" type="date" name="proofDate"
                          value={this.state.proofDate}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="allNote">적요</CLabel>
                  <CInput id="allNote" type="text" name="allNote"
                          value={this.state.allNote}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
            </CFormGroup>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    상세 내역
                  </CCardHeader>
                  <CCardBody>
                  <StatementDetailAdd setData={this.setData}/>
                    <CFormText>작성 후 추가버튼을 꼭 눌러주세요!</CFormText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>작성</Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>

      </Dialog>

  </div>
  )

  }

  }


  export default withStyles(styles)(StatementAdd)



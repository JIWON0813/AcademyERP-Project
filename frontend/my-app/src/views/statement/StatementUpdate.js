import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles,} from "@material-ui/core";
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup, CFormText, CInput, CLabel, CRow} from '@coreui/react'
import StatementDetailUpdate from "./StatementDetailUpdate";
import ApiService from "../../ApiService";

const styles = theme => ({
  hidden: {
    display: 'none'
  }

});

const url = "statement"
class StatementUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statementDetailsList: '',
      no: this.props.id,
      employee: '',
      branch: '',
      disabled: true,
      workplace: '',
      allNote: "",
      proofDate: '',
      reportingDate: '',
      list: '',

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateStatement = this.updateStatement.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  componentDidMount() {
    this.getApi();

  }

  getApi = () => {
    ApiService.getURLById(url,this.props.id)
      .then(res => {
        this.setState({
          statementList: res.data.list,
          workplace: res.data.list.workplace,
          employee: res.data.list.employee,
          branch: res.data.list.branch,
          allNote: res.data.list.allNote,
          proofDate: res.data.list.proofDate,
          list: res.data.list.list,
          reportingDate: res.data.list.reportingDate,
          statementDetailsList: res.data.details
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
      this.updateStatement()
      this.setState({
        disabled: true,
        workplace: '',
        allNote: "",
        proofDate: '',
        reportingDate: '',
        list: '',
      })
      alert("등록되었습니다.");
      this.props.stateRefresh();
      this.handleClose();
    }
  }

  updateStatement() {
    console.log(this.state.list);
    let statement = {
      workplace: this.state.workplace,
      employee: this.state.employee,
      branch: this.state.branch,
      allNote: this.state.allNote,
      proofDate: this.state.proofDate,
      reportingDate: this.state.reportingDate,
      list: this.state.list,
    }
    ApiService.updateById(url,this.props.id,statement)
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
      disabled: true,
      workplace: '',
      allNote: "",
      proofDate: '',
      reportingDate: '',
      list: '',
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
      list: info,
    })
  }

  render() {
    const {statementDetailsList} = this.state;

    let name = "수정"
    if (this.state.disabled) {
      name = "수정"
    } else {
      name = "수정완료"
    }

    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>{this.props.id}</Button>

        <Dialog open={this.state.open} onClose={this.handleClose} maxWidth={true}>
          <DialogTitle>전표조회</DialogTitle>
          <DialogContent>
            <CFormGroup row className="my-0">
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="workplace">사업장</CLabel>
                  <CInput id="workplace" value={this.state.workplace} disabled={true}/>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="branch">지점코드</CLabel>
                  <CInput id="branch" value={this.state.branch} disabled={true}/>
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
                          disabled={this.state.disabled}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="proofDate">증빙일</CLabel>
                  <CInput id="proofDate" type="date" name="proofDate"
                          value={this.state.proofDate}
                          disabled={this.state.disabled}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="allNote">적요</CLabel>
                  <CInput id="allNote" type="text" name="allNote"
                          value={this.state.allNote}
                          disabled={this.state.disabled}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
            </CFormGroup>

            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    전표 상세
                  </CCardHeader>
                  <CCardBody>
                    <StatementDetailUpdate setData={this.setData}
                                           statementDetails={statementDetailsList}
                                           id={this.props.id}
                                           disabled={this.state.disabled}/>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>{name}</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(StatementUpdate)



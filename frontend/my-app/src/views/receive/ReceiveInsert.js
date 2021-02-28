//-----------------------
// 제목 : 등록 - 수납관리
// 파일명 : ReciveInsert.js
// 작성자 : 최인아
//-----------------------
import React from 'react'
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles, Grid } from "@material-ui/core";
import { CCol, CFormGroup, CRow, CSelect } from '@coreui/react'


const styles = theme => ({
    hidden: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

class ReceiveInsert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      branchList: "",
      student: '',
      lecture: '',
      date: '',
      pay: '',
      unpaid: '',
      status: '',
      hp: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.receiveInsert = this.receiveInsert.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.branchSelect = this.branchSelect.bind(this);

  }

  componentDidMount() {
    this.getApi();

  }

  getApi = () => {
    axios.get("http://localhost:8080/receive/branches")
      .then(res => {
        this.setState({
          branchList: res.data.list
        })
      })
      .catch(res => console.log(res))
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.receiveInsert()
    this.setState({
        student: '',
        lecture: '',
        date: '',
        pay: '',
        unpaid: '',
        status: '',
        hp: '',
        branch: ''
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
  }

  handleChange = (event) => {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  receiveInsert() {
    axios({
      url: 'http://localhost:8080/receive',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        student: this.state.student,
        lecture: this.state.lecture,
        date: this.state.date,
        pay: this.state.pay,
        unpaid: this.state.unpaid,
        status: this.state.status,
        hp: this.state.hp,
        branch:this.state.branch
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
        student: '',
        lecture: '',
        date: '',
        pay: '',
        unpaid: '',
        status: '',
        hp: '',
        branch: '',
      open: false
    })
    this.props.stateRefresh();
  }

  branchSelect = (e) => {
    this.setState({
      branch: e.target.value
    })
  }

  render() {
    const { branchList } = this.state;
  
    return (
      <div>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>등록</Button>
        </Grid>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true} maxWidth = {'xs'}>
          <DialogTitle>수 납  등 록</DialogTitle> 

          <DialogContent>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="branch" onChange={this.branchSelect} value={this.state.branch}>
                    <option value="">지점</option>
                    {branchList && branchList.map((itemdata, Index) => {
                      return (<option key={Index} value={itemdata.no}>{Index + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
                </CFormGroup>
              </CCol>
            </CRow>
              <CFormGroup row>
                <CCol xs="12" md="9">
                  납부일
                  <br></br>
                  <TextField type="date" name="date" value={this.state.date} onChange={this.handleChange}/><br/>
                  <TextField label="납부금액" type="text" name="pay" value={this.state.pay} onChange={this.handleChange}/><br/>
                  <TextField label="미납금액" type="text" name="unpaid" value={this.state.unpaid} onChange={this.handleChange}/><br/>
                </CCol>
              </CFormGroup>
              <br></br>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
            </DialogActions>
          </DialogContent>
        
          </Dialog>
      </div>
    )

  }

}


export default withStyles(styles)(ReceiveInsert)



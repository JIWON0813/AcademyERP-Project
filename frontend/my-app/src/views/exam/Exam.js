import React from 'react'
import axios from 'axios';

import {CButton, CCol, CFormGroup, CRow, CSelect} from '@coreui/react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Dialog, Grid, IconButton, Select, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExamAdd from "./ExamAdd";
import ExamUpdate from "./ExamUpdate";
import ExamDelete from "./ExamDelete";

const styles = theme => ({
  hidden: {
    display: 'none'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingRight:theme.spacing(10)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


class Exam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lectureList: "",
      examList: "",
      examDetail: "",
      teacher: this.props.teacher,
      exam: "",
      lecture: ""
    }

    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.lectureSelect = this.lectureSelect.bind(this);
    this.stateRefresh = this.stateRefresh.bind(this);

  }

  componentDidMount() {
    this.getApi();

  }
  componentDidUpdate(prevProps) {
    if(this.props.id !== prevProps.id)
    {
      this.getDetail()
    }
  }
  getApi() {
    axios.get("http://localhost:8080/teacher/" + this.state.teacher)
      .then(res => {
        this.setState({
          lectureList: res.data.lectureList,
        })
      })
      .catch(res => console.log(res))
  }

  getExam = () => {
    axios.get("http://localhost:8080/exam?lecture="+this.state.lecture)
      .then(res => {
        this.setState({
          examList: res.data.list,
        })
      })
      .catch(res => console.log(res))
  }
  getDetail = () => {
    axios.get("http://localhost:8080/exam/"+this.state.exam)
      .then(res => {
        if(res.data.list !== null){
          this.setState({
            partDetail: res.data.list,
          })}else{this.setState({
          partDetail:"",
        })}
      })
      .catch(res => console.log(res))
  }
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {

    this.setState({
      examList: "",
      examDetail: "",
      teacher: this.props.teacher,
      exam: "",
      lecture: "",
      open: false
    })
    this.props.stateRefresh();
  }

  lectureSelect = (e) => {
    this.setState({
      lecture: e.target.value
    })
    axios.get("http://localhost:8080/exam?lecture=" + e.target.value)
      .then(res => {
        this.setState({
          examList: res.data.list,
        })
      })
      .catch(res => console.log(res))
  }


  stateRefresh() {
    console.log("refresh")
    this.setState({
      examList: "",
      examDetail: "",
      exam: "",
    });
    this.getExam();
    this.getDetail();

  }

  render() {
    const {lectureList} = this.state;
    const {examList} = this.state;
    const {examDetail} = this.state;
    const handleChangeMultiple = (event) => {
      const {options} = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      axios.get("http://localhost:8080/exam/"+ value)
        .then(res => {
          this.setState({
            examDetail: res.data.list,
            exam: value,
          })
        })
        .catch(res => console.log(res))
    };
    return (
      <div>
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <CButton color="primary" color="danger" onClick={this.handleClickOpen}>시험항목 관리</CButton>
        </CCol>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            시험항목 조회</DialogTitle>

          <DialogContent dividers>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="branch" onChange={this.lectureSelect} value={this.state.lecture}>
                    <option value="">강의</option>
                    {lectureList && lectureList.map((itemdata, insertIndex) => {
                      return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
                </CFormGroup>
                <Grid container justify="flex-end">
                  <Button onClick={this.stateRefresh}>새로고침</Button>
                </Grid>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <Select
                    multiple
                    native
                    onChange={handleChangeMultiple} value={this.state.exam}

                  >
                    {examList && examList.map((itemdata, insertIndex) => {
                      return (<option
                        value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </Select>
                </CFormGroup>
              </CCol>
            </CRow>

          </DialogContent>
          {examList.length !== 0 &&
          <DialogActions>
            <ExamAdd stateRefresh={this.stateRefresh} lecture={this.state.lecture} teacher={this.state.teacher}/>
            <ExamUpdate stateRefresh={this.stateRefresh} teacher={this.state.teacher} examDetail={examDetail}/>
            <ExamDelete stateRefresh={this.stateRefresh} id={this.state.exam}/>
          </DialogActions>
          }
        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(Exam)



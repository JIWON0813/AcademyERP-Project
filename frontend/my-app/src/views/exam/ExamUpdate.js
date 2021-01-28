import React from 'react'
import axios from 'axios';

import {CCol, CFormGroup, CInput, CLabel, CRow, CSelect} from '@coreui/react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Dialog, IconButton, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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


class ExamUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teacher:"",
      lectureList:"",
      lecture:"",
      name: "",
      weight:"",
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateExam = this.updateExam.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    this.getApi()
  }

  getApi() {
    axios.get("http://localhost:8080/teacher/" + this.props.teacher)
      .then(res => {
        this.setState({
          lectureList: res.data.lectureList,
        })
      })
      .catch(res => console.log(res))
  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.updateExam()
    this.setState({
      lectureList:"",
      lecture:"",
      name: "",
      weight:"",
    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
    this.handleClose()
    /*this.props.history.push('/lecture')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleNumChange(evt) {
    const weight = (evt.target.validity.valid) ? evt.target.value : this.state.weight;
    this.setState({ weight });
  }

  updateExam() {
    axios({
      url: 'http://localhost:8080/exam/' + this.props.examDetail.no,
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        lecture: this.state.lecture,
        weight:this.state.weight,
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
    if(this.props.examDetail !== '') {
      this.setState({
        teacher:this.props.teacher,
        name: this.props.examDetail.name,
        lecture:this.props.examDetail.lecture,
        weight:this.props.examDetail.weight,
        open: true,
      });
    }else{
      alert("수정항목을 선택하세요")
    }
  }

  handleClose() {
    this.setState({
      lectureList:"",
      lecture:"",
      name: "",
      weight:"",
      open: false
    })
    this.props.stateRefresh();
  }

  render() {
    const {lectureList} = this.state;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>수정</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            시험항목 수정</DialogTitle>

          <DialogContent dividers>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="lecture" defaultValue={this.props.examDetail.lecture} disabled={true}>
                    <option value="">강의</option>
                    {lectureList && lectureList.map((itemdata, insertIndex) => {
                      return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="10">
                <CFormGroup>
                  <CLabel htmlFor="name">시험항목명</CLabel>
                  <CInput type="text" id="name" name="name" placeholder="시험항목명" defaultValue={this.props.examDetail.name}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="10">
                <CFormGroup>
                  <CLabel htmlFor="name">가중치</CLabel>
                  <CInput  type="text" pattern="[0-9]*"
                           onInput={this.handleNumChange.bind(this)}
                           id="weight"
                           name="weight"
                           placeholder="숫자만 입력"
                           value={this.state.weight}
                         />

                </CFormGroup>
              </CCol>
            </CRow>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</Button>
          </DialogActions>


        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(ExamUpdate)



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
    paddingRight: theme.spacing(10)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
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


class ExamAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teacher: this.props.teacher,
      lectureList: "",
      lecture: "",
      name: "",
      weight: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addexam = this.addexam.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    this.getApi();

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
    this.addexam()
    this.setState({
      name: '',
      weight: "",
      open: false
    })
    alert("등록되었습니다.");
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

  addexam() {
    axios({
      url: 'http://localhost:8080/exam',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        lecture: this.state.lecture,
        weight: this.state.weight,
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
      teacher:this.props.teacher,
      lecture: this.props.lecture,
      open: true
    });
  }

  handleClose() {

    this.setState({
      name: "",
      open: false
    })
    this.props.stateRefresh();
  }

  render() {
    const {lectureList} = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>추가</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            시험항목 등록</DialogTitle>

          <DialogContent dividers>

            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="lecture" defaultValue={this.props.lecture} disabled={true}>
                    <option value="">지점</option>
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
                  <CInput type="text" id="name" name="name" placeholder="시험항목명" value={this.state.name}
                          onChange={this.handleValueChange}/>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10">
                <CFormGroup>
                  <CLabel htmlFor="name">가중치(%)</CLabel>
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
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(ExamAdd)



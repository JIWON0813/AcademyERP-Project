import React from 'react'
import axios from 'axios';

import {CCol, CFormGroup, CTextarea} from '@coreui/react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Dialog, IconButton, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ApiService from "../../ApiService";

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


class CounselingAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lecture:"",
      student:"",
      content:"",
      regdate:"",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addCounseling = this.addCounseling.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.addCounseling()
    this.setState({
      lecture:"",
      student:"",
      content:"",
      regdate:"",
      open: false
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCounseling() {
    let counseling = {
      lecture:this.state.lecture,
      student:this.state.student,
      content:this.state.content,
      regdate:new Date(),
    }
    const url = "counseling"
    ApiService.Insert(url,counseling)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleClickOpen() {
    this.setState({
      student:this.props.student,
      lecture: this.props.lecture,
      open: true
    });
  }

  handleClose() {

    this.setState({
      content: "",
      regdate:"",
      open: false
    })
  }

  render() {

    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>상담내용 추가</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            상담내용 등록</DialogTitle>

          <DialogContent dividers>
            <CFormGroup row>
              <CCol xs="12" md="12">
                <CTextarea
                  name="content"
                  id="content"
                  rows="9"
                  placeholder="상담내용을 입력하세요"
                  onChange={this.handleValueChange}
                  value={this.state.content}
                />
              </CCol>
            </CFormGroup>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(CounselingAdd)



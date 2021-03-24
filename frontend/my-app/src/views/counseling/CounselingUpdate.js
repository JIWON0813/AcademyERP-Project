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
import UpdateIcon from "@material-ui/icons/Update";
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

const url = "counseling"

class CounselingAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no:this.props.itemdata.no,
      student:this.props.itemdata.student,
      lecture:this.props.itemdata.lecture,
      regdate:this.props.itemdata.regdate,
      content:"",
      modify:"",
      counselingList:"",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.updateCounseling = this.updateCounseling.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  componentDidMount() {
    this.getApi();
  }

  getApi = () => {
    ApiService.getURLById(url,this.props.itemdata.no)
      .then(res => {
        this.setState({
          counselingList: res.data.list
        })
      })
      .catch(res => console.log(res))
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.updateCounseling()
    this.setState({
      content:"",
      regdate:"",
      counselingList:"",
      open: false
    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateCounseling() {
    let counseling = {
      content:this.state.content,
      regdate:this.state.regdate,
      modify:new Date(),
      lecture:this.state.lecture,
      student:this.state.student,
    }

    ApiService.updateById(url,this.state.no,counseling)
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
      content: "",
      modify:"",
      open: false
    })
    this.props.stateRefresh();
  }

  render() {
    const {counselingList} = this.state
    return (
      <div>
        <IconButton aria-label="update">
          <UpdateIcon fontSize="small" onClick={this.handleClickOpen}/>
        </IconButton>
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
                  onChange={this.handleValueChange}
                  defaultValue={counselingList.content}
                ></CTextarea>
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



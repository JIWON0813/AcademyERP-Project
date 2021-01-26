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


class PartAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      branchList:"",
      name: "",
      branch: "",

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addpart = this.addpart.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.branchSelect = this.branchSelect.bind(this);

  }

  componentDidMount() {
    this.getApi();

  }

  getApi = () => {
    axios.get("http://localhost:8080/lecture/branches")
      .then(res => {
        this.setState({
          branchList: res.data.list
        })
      })
      .catch(res => console.log(res))
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.addpart()
    this.setState({
      branch: '',
      name: '',
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

  addpart() {
    axios({
      url: 'http://localhost:8080/part',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        branch: this.state.branch,
        name: this.state.name,
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
      branch:this.props.branch,
      open: true
    });
  }

  handleClose() {

    this.setState({
      branch: '',
      name: '',
      partList: '',
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
    const {branchList} = this.state;
    return (
      <div>
          <Button color="primary" onClick={this.handleClickOpen}>추가</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            분야 등록</DialogTitle>

          <DialogContent dividers>

            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="branch" onChange={this.branchSelect} defaultValue={this.props.branch} >
                    <option value="">지점</option>
                    {branchList && branchList.map((itemdata, insertIndex) => {
                      return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
                </CFormGroup>
              </CCol>
            </CRow>

              <CRow>
              <CCol xs="10">
                <CFormGroup>
                  <CLabel htmlFor="name">분야명</CLabel>
                  <CInput type="text" id="name" name="name" placeholder="분야명" value={this.state.name}
                          onChange={this.handleValueChange}/>
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


export default withStyles(styles)(PartAdd)



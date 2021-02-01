import React from 'react'
import axios from 'axios';

import {CButton, CCol, CFormGroup, CRow, CSelect} from '@coreui/react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Dialog, Grid, IconButton, Select, withStyles} from "@material-ui/core";
import RoomDelete from "./RoomDelete";
import RoomAdd from "./RoomAdd";
import RoomUpdate from "./RoomUpdate";
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


class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      branchList: "",
      roomList: "",
      roomDetail:"",
      room: "",
      branch: ""

    }

    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.branchSelect = this.branchSelect.bind(this);
    this.stateRefresh = this.stateRefresh.bind(this);

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

  getRoom = () => {
    axios.get("http://localhost:8080/lecture/select?branch=" + this.state.branch)
      .then(res => {
        this.setState({
          roomList: res.data.roomList,
        })
      })
      .catch(res => console.log(res))
  }
  getDetail = () => {
    axios.get("http://localhost:8080/room/"+this.state.room)
      .then(res => {
        if(res.data.list !== null){
        this.setState({
          roomDetail: res.data.list,
        })}else{this.setState({
          roomDetail:"",
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
      room: '',
      branch: '',
      roomList: '',
      roomDetail:'',
      open: false
    })
    this.props.stateRefresh();
  }

  branchSelect = (e) => {
    this.setState({
      branch: e.target.value
    })
    axios.get("http://localhost:8080/lecture/select?branch=" + e.target.value)
      .then(res => {
        this.setState({
          roomList: res.data.roomList,
        })
      })
      .catch(res => console.log(res))
  }


  stateRefresh() {
    this.setState({
      room: '',
      roomList: '',
      roomDetail:'',
    });
    this.getRoom();
    this.getDetail();

  }

  render() {
    const {branchList} = this.state;
    const {roomList} = this.state;
    const {roomDetail}= this.state;

    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      axios.get("http://localhost:8080/room/"+value)
        .then(res => {
          this.setState({
            roomDetail: res.data.list,
            room:value,
          })
        })
        .catch(res => console.log(res))

    };
    return (
      <div>
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <CButton variant="outline" color="success" onClick={this.handleClickOpen}>강의실 관리</CButton>
        </CCol>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            강의실 조회</DialogTitle>

          <DialogContent dividers>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="branch" onChange={this.branchSelect} value={this.state.branch}>
                    <option value="">지점</option>
                    {branchList && branchList.map((itemdata, insertIndex) => {
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
              onChange={handleChangeMultiple} value={this.state.room}

            >
              {roomList && roomList.map((itemdata, insertIndex) => {
                return (<option
                  value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}&nbsp;({itemdata.max_person}명)</option>);
              })}
            </Select>
                </CFormGroup>
              </CCol>
            </CRow>

          </DialogContent>
          {roomList.length !== 0 &&
          <DialogActions>
            <RoomAdd stateRefresh={this.stateRefresh} branch={this.state.branch}/>
            <RoomUpdate stateRefresh={this.stateRefresh} branch={this.state.branch} roomDetail={roomDetail}/>
            <RoomDelete stateRefresh={this.stateRefresh} id={this.state.room}/>
          </DialogActions>
          }
        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(Room)



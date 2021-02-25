import React from 'react'
import axios from "axios";
import {Dialog, Grid, IconButton, withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {CButton, CCol, CFormGroup, CTextarea} from "@coreui/react";
import CounselingAdd from "./CounselingAdd";
import RefreshIcon from "@material-ui/icons/Refresh";
import CounselingUpdate from "./CounselingUpdate";
import CounselingDelete from "./CounselingDelete";

const styles = theme => ({
  hidden: {
    display: 'none'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
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

class CounselingRecord extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      student: this.props.id,
      lecture: this.props.lecture,
      name: this.props.name,
      counselingList: "",

    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = () => {
    axios.get("http://localhost:8080/counseling?student=" + this.state.student + "&lecture=" + this.state.lecture)
      .then(res => {
        this.setState({
          counselingList: res.data.counselingList
        })
      })
      .catch(res => console.log(res))
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleClickOpen() {
    this.setState({
      student: this.props.id,
      lecture: this.props.lecture,
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  stateRefresh() {
    this.setState({
      counselingList: "",
    });
    this.getApi();
    this.getApi();
  }

  render() {
    const {counselingList} = this.state;
    const date=(item) => {
      var date = new Date(item);
      var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0] + "  " + new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString().split("T")[1].split(".")[0]
    return dateString
    }
    return (
      <div>
        <CButton block color="secondary" onClick={this.handleClickOpen}>상세</CButton>

        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}
                fullWidth={true}
                maxWidth={'xs'}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.name} 상담기록</DialogTitle>
          <DialogContent dividers>


            {counselingList && counselingList.map((itemdata) => {
              return (<CFormGroup row>
                <CCol xs="12" md="12">
                  <CTextarea
                    name="content"
                    id="content"
                    rows="9"
                    disabled={true}
                    value={itemdata.content}
                  />
                </CCol>
                <CCol xs="12" md="12">
                  <Grid container>
                    <div>
                  작성날짜 :&nbsp;
                  { date(itemdata.regdate)}
                  {itemdata.modify !== null &&
                   <div>
                    마지막 수정날짜 :&nbsp;
                    {date(itemdata.modify)}
                    </div>
                  }
                      </div>&nbsp;&nbsp;
                  <CounselingUpdate stateRefresh={this.stateRefresh} itemdata={itemdata}/>
                  <CounselingDelete stateRefresh={this.stateRefresh} id={itemdata.no}/>
                  </Grid>
                </CCol>
              </CFormGroup>);
            })}


          </DialogContent>
          <DialogActions>
            <IconButton aria-label="refresh" onClick={this.stateRefresh}><RefreshIcon/></IconButton>
            <CounselingAdd stateRefresh={this.stateRefresh}
                           student={this.state.student}
                           lecture={this.state.lecture}
            />
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}

export default withStyles(styles)(CounselingRecord)

import React from 'react'
import axios from 'axios';
import {Button, Dialog,IconButton, withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ConsultUpdate from "./ConsultUpdate";
import ConsultDelete from "./ConsultDelete";

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

class Consult extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ConsultList: ""
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }



componentDidMount() {
  this.getApi();
}

getApi = () => {
  axios.get("http://localhost:8080/api2/consult/"+this.props.id)
    .then(res => {
      this.setState({
        ConsultList: res.data.message
      })
    })
    .catch(res => console.log(res))
}

goBack = () => {
  this.props.history.goBack();
}

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {

    this.setState({

      open: false
    })
  }



  render() {
    const { ConsultList } = this.state;

    return (
      <div>
          <Button color="primary" onClick={this.handleClickOpen}>{ConsultList.name}</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}
                fullWidth={true}
                maxWidth = {'xs'}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            상담신청인 : {ConsultList.name}</DialogTitle>
          <DialogContent dividers>
            <table className="table table-striped table-hover">
              <tbody>  
              <tr><td>{`no:`}</td><td><strong>{ConsultList.no}</strong></td></tr>
              <tr><td>{`성명:`}</td><td><strong>{ConsultList.name}</strong></td></tr>
              <tr><td>{`전화번호:`}</td><td><strong>{ConsultList.hp}</strong></td></tr>
              <tr><td>{`상담일자:`}</td><td><strong>{ConsultList.schedule}</strong></td></tr>
              <tr><td>{`상담내용:`}</td><td><strong>{ConsultList.memo}</strong></td></tr>
              {/* <tr><td>{`접수날짜:`}</td><td><strong>{ConsultList.regdate}</strong></td></tr> */}
              {/* <tr><td>{`상담경로:`}</td><td><strong>{ConsultList.route}</strong></td></tr> */}
              <tr><td>{`작성자:`}</td><td><strong>{ConsultList.writer}</strong></td></tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <ConsultUpdate stateRefresh={this.props.stateRefresh} ConsultList={ConsultList}/>
            <ConsultDelete stateRefresh={this.props.stateRefresh} id={ConsultList.no}/>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}
export default withStyles(styles)(Consult)



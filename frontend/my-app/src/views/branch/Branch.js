import React from 'react'
import axios from 'axios';
import {Button, Dialog,IconButton, withStyles} from "@material-ui/core";
import BranchDelete from "./BranchDelete";
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import BranchUpdate from "./BranchUpdate";

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

class Branches extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      branchList: ""
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }



componentDidMount() {
  this.getApi();
}

getApi = () => {
  axios.get("http://localhost:8080/api2/branch/"+this.props.id)
    .then(res => {
      this.setState({
        branchList: res.data.message
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
    const { branchList } = this.state;

    return (
      <div>
          <Button color="primary" onClick={this.handleClickOpen}>{branchList.name}</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          User name: {branchList.name}</DialogTitle>
          <DialogContent dividers>
            <table className="table table-striped table-hover">
              <tbody>
              <tr><td>{`no:`}</td><td><strong>{branchList.no}</strong></td></tr>
              <tr><td>{`name:`}</td><td><strong>{branchList.name}</strong></td></tr>
              <tr><td>{`address:`}</td><td><strong>{branchList.address}</strong></td></tr>
              <tr><td>{`hp:`}</td><td><strong>{branchList.hp}</strong></td></tr>
              <tr><td>{`owner:`}</td><td><strong>{branchList.owner}</strong></td></tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <BranchUpdate stateRefresh={this.props.stateRefresh} branchList={branchList}/>
            <BranchDelete stateRefresh={this.props.stateRefresh} id={branchList.no}/>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}
export default withStyles(styles)(Branches)



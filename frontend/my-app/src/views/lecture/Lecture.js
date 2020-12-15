import React from 'react'
import axios from 'axios';
import {Button, Dialog,IconButton, withStyles} from "@material-ui/core";
import LectureDelete from "./LectureDelete";
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import LectureUpdate from "./LectureUpdate";

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

class Lectures extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ItemList: ""
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }



componentDidMount() {
  this.getApi();
}

getApi = () => {
  axios.get("http://localhost:8080/api2/lecture/"+this.props.id)
    .then(res => {
      this.setState({
        ItemList: res.data.message
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
    const { ItemList } = this.state;

    return (
      <div>
          <Button color="primary" onClick={this.handleClickOpen}>{ItemList.name}</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}
                fullWidth={true}
                maxWidth = {'xs'}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          {ItemList.name}</DialogTitle>
          <DialogContent dividers>
            <table className="table table-striped table-hover">
              <tbody>
              <tr><td>{`no:`}</td><td><strong>{ItemList.no}</strong></td></tr>
              <tr><td>{`name:`}</td><td><strong>{ItemList.name}</strong></td></tr>
              <tr><td>{`teacher:`}</td><td><strong>{ItemList.teacher}</strong></td></tr>
              <tr><td>{`price:`}</td><td><strong>{ItemList.price}</strong></td></tr>
              <tr><td>{`students:`}</td><td><strong>{ItemList.students}</strong></td></tr>
              <tr><td>{`room:`}</td><td><strong>{ItemList.room}</strong></td></tr>
              <tr><td>{`start_date:`}</td><td><strong>{ItemList.start_date}</strong></td></tr>
              <tr><td>{`end_date:`}</td><td><strong>{ItemList.end_date}</strong></td></tr>
              <tr><td>{`day:`}</td><td><strong>{ItemList.day}</strong></td></tr>
              <tr><td>{`start_time:`}</td><td><strong>{ItemList.start_time}</strong></td></tr>
              <tr><td>{`end_time:`}</td><td><strong>{ItemList.end_time}</strong></td></tr>
              <tr><td>{`part:`}</td><td><strong>{ItemList.part}</strong></td></tr>
              <tr><td>{`branch:`}</td><td><strong>{ItemList.branch}</strong></td></tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <LectureUpdate stateRefresh={this.props.stateRefresh} ItemList={ItemList}/>
            <LectureDelete stateRefresh={this.props.stateRefresh} id={ItemList.no}/>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}
export default withStyles(styles)(Lectures)



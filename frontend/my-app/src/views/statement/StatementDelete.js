import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

class StatementDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false

    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

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


  delete(id) {
    const url = 'http://localhost:8080/statement/'+ id;
    fetch(url, {
      method: 'DELETE'
    });
    alert("삭제 되었습니다.");
    this.props.stateRefresh();
  }


  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>삭제</Button>
        <Dialog onClose={this.handleClose} open={this.state.open}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>

          <DialogContent>
            <Typography gutterBottom>
              선택한 전표가 삭제됩니다.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => {
              this.delete(this.props.id)
            }}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>

      </div>

    )

  }

}

export default withRouter(StatementDelete)


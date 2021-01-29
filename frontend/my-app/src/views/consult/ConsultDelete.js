//-----------------------
// 제목 : 상담 삭제
// 파일명 : ConsultDelete.js
// 작성자 : 최인아
// 작성일 : 
//-----------------------
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

class ConsultDelete extends Component {
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


  deleteConsult(id) {
    const url = 'http://localhost:8080/consult/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    alert("삭제 되었습니다.");
    this.props.stateRefresh();
  }


  render() {
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          삭제
        </Button>

        <Dialog onClose={this.handleClose} open={this.state.open}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>

          <DialogContent>
            <Typography gutterBottom>
              삭제하시겠습니까?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => {
              this.deleteConsult(this.props.id)
            }}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>

    )

  }

}

export default withRouter(ConsultDelete)


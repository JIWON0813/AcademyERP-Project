import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

class NoticeUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.branchList.name,
      address: this.props.branchList.address,
      hp: this.props.branchList.hp,
      owner: this.props.branchList.owner
    }


    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateNotice = this.updateNotice.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.updateNotice()
    this.setState({
     // branchList: '',
      name: '',
      address: '',
      hp: '',
      owner: ''
    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
    /*this.props.history.push('/branch')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateNotice() {
    console.log(this.state.name);
      console.log(this.state.address);
        console.log(this.state.hp);
          console.log(this.state.owner);
    axios({
      url: 'http://localhost:8080/notice/edit/' + this.props.noticeList.no,
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        address: this.state.address,
        hp: this.state.hp,
        owner: this.state.owner
      }
    })
      .then(function (response){
        console.log(response)
      })
      .catch(function (error){
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
      open: false
    })
  }



  render() {
    let noticeList = this.props.noticeList;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          수정
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>클래스 수정</DialogTitle>
          <DialogContent>
            <TextField label="지점명" type="text" name="name" defaultValue={noticeList.name} onChange={this.handleValueChange}/><br/>
            <TextField label="주소" type="text" name="address" defaultValue={noticeList.address} onChange={this.handleValueChange}/><br/>
            <TextField label="전화번호" type="text" name="hp" defaultValue={noticeList.hp} onChange={this.handleValueChange}/><br/>
            <TextField label="소유주" type="text" name="owner" defaultValue={noticeList.owner}
                       onChange={this.handleValueChange}/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(NoticeUpdate)

import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";

const styles = theme => ({
    hidden: {
    display: 'none'
  }
});

class BranchAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      hp: '',
      owner: ''

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addBranch = this.addBranch.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.addBranch()
    this.setState({
      name: '',
      address: '',
      hp: '',
      owner: ''
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
    /*this.props.history.push('/branch')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addBranch() {
    axios({
      url: 'http://localhost:8080/api2/branch',
      method: "POST",
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
      name: '',
      address: '',
      hp: '',
      owner: '',
      open: false
    })
  }



  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>클래스 추가</DialogTitle>
          <DialogContent>
            <TextField label="지점명" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
            <TextField label="주소" type="text" name="address" value={this.state.address} onChange={this.handleValueChange}/><br/>
            <TextField label="전화번호" type="text" name="hp" value={this.state.hp} onChange={this.handleValueChange}/><br/>
            <TextField label="소유주" type="text" name="owner" value={this.state.owner}
                             onChange={this.handleValueChange}/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(BranchAdd)



import React, { Component } from "react";
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> f12f9191e61f18a407d84447628ed8a617cd72c6
class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        asd: ""
    }
  }

<<<<<<< HEAD
  componentDidMount() {
    const { params } = this.props.match;
    if(Number(params.log)===0){
      this.logIN();
    }else{
      this.logOUT()
    }
  }

  logIN = () =>{
    const { params } = this.props.match;
    window.sessionStorage.setItem('id',params.name);
    window.sessionStorage.setItem('no',params.no);
    window.sessionStorage.setItem('dep',params.dep);
    this.setState ({asd: params.no});
    alert("로그인");
    document.location.href = "#";
    window.location.reload(false);
  }

  logOUT = () =>{
    window.sessionStorage.clear();
    alert("로그아웃");
    document.location.href = "#";
    window.location.reload(false);
  }

  render() {
    return(
      <div>
        
=======
componentDidMount() {
  this.log();
}

log = () =>{
  const { params } = this.props.match;
  window.sessionStorage.setItem('id',params.name);
  window.sessionStorage.setItem('no',params.no);
  this.setState ({asd: params.no})
  
}

render() {
    return(
      <div>
        <Link to={`/users`} >로그인{this.asd}</Link>
>>>>>>> f12f9191e61f18a407d84447628ed8a617cd72c6
      </div>
    );
  }
}

export default login;

import React, { Component } from "react";
class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        asd: ""
    }
  }

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
        
      </div>
    );
  }
}

export default login;

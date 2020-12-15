import React, { Component } from "react";
import { Link } from 'react-router-dom';
class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        asd: ""
    }
  }

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
      </div>
    );
  }
}

export default login;

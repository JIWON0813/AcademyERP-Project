import React, { Component } from "react";
import axios from "axios";
import './table.css';
import { Link } from 'react-router-dom';
import ConsultInsert from "./ConsultInsert";
// import Consult from "./Consult";
import ConsultSearch from "./ConsultSearch";

class Consults extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ConsultList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this)
    
}

stateRefresh() {
  this.setState({
    ConsultList: ""
  });
  this.getApi();
}

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/consult")
        .then(res => {
            this.setState({
              ConsultList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { ConsultList } = this.state;

    return (
      <div>
        <header>
        <ConsultSearch/>
        <ConsultInsert stateRefresh={this.stateRefresh}/>
        </header>
        <br></br>
    <table>
        <thead>
            <td>NO</td>
            <td>name</td>
            <td>  hp  </td>
            <td>schedule</td>
            <td>memo</td>
            {/* <td>regdate</td> */}
            <td>route</td>
            <td>writer</td>
            <td>detail</td>
        </thead>
        <tbody>
        {ConsultList&&ConsultList.map((consultdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{consultdata.no}</td>
                <td>{consultdata.name}</td>
                {/* <td><Consult stateRefresh={this.stateRefresh} id={consultdata.no}/></td> */}
                <td>{consultdata.hp}</td>
                <td>{consultdata.schedule}</td>
                <td>{consultdata.memo}</td>
                {/* <td>{consultdata.regdate}</td> */}
                <td>{consultdata.route}</td>
                <td>{consultdata.writer}</td>
                <td><Link to={`/consult/${consultdata.no}`}>확인</Link></td>
              </tr>
            );
          })}
        </tbody> 
      </table>
      </div>
    );
  }
}

export default Consults;

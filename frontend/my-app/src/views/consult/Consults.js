import React, { Component } from "react";
import axios from "axios";
import './table.css';
import ConsultInsert from "./ConsultInsert";
import Consult from "./Consult";

class Consults extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ConsultList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

stateRefresh() {
  this.setState({
    ConsultList: "",
  });
  this.getApi();

}

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/api2/consult")
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
         <ConsultInsert stateRefresh={this.stateRefresh}/>
         <br></br>
        </header>
    <table>
        <thead>
            <td>NO</td>
            <td>name</td>
            <td>hp</td>
            <td>schedule</td>
            <td>memo</td>
            {/* <td>route</td> */}
            <td>writer</td>
        </thead>
        <tbody>
        {ConsultList&&ConsultList.map((consultdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{consultdata.no}</td>
                <td> <Consult stateRefresh={this.stateRefresh} id={consultdata.no}/></td>
                <td>{consultdata.hp}</td>
                <td>{consultdata.schedule}</td>
                <td>{consultdata.memo}</td>
                {/* <td>{consultdata.route}</td> */}
                <td>{consultdata.writer}</td>
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

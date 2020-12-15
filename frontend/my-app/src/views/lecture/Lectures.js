import React, {Component} from "react";
import axios from "axios";
import './table.css';
import LectureAdd from "./LectureAdd";
import Lecture from "./Lecture";

class Lectures extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      ItemList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/api2/lecture")
        .then(res => {
            this.setState({
              ItemList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { ItemList } = this.state;

    return (
      <div>
        <header>
          <LectureAdd stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        <table>
        <thead>
          <tr><td>NO</td><td>NAME</td><td>Teacher</td><td>PRICE</td><td>Students</td><td>ROOM</td>
          <td>START_DATE</td><td>END_DATE</td><td>DAY</td><td>START_TIME</td><td>END_TIME</td><td>PART</td><td>BRANCH</td>
          </tr>
        </thead>
        <tbody>
         {ItemList&&ItemList.map((itemdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td> <Lecture stateRefresh={this.stateRefresh} id={itemdata.no}/></td>
                <td>{itemdata.teacher}</td>
                <td>{itemdata.price}</td>
                <td>{itemdata.students}</td>
                <td>{itemdata.room}</td>
                <td>{itemdata.start_date}</td>
                <td>{itemdata.end_date}</td>
                <td>{itemdata.day}</td>
                <td>{itemdata.start_time}</td>
                <td>{itemdata.end_time}</td>
                <td>{itemdata.part}</td>
                <td>{itemdata.branch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Lectures;

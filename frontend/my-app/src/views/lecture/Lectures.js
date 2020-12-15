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
          <tr><td>NO</td><td>강의명</td><td>강사</td><td>수강료</td><td>정원수</td><td>강의실</td>
          <td>개강일</td><td>종강일</td><td>요일</td><td>시작시간</td><td>종료시간</td><td>분야</td><td>지점</td>
          </tr>
        </thead>
        <tbody>
         {ItemList&&ItemList.map((itemdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td> <Lecture stateRefresh={this.stateRefresh} id={itemdata.no}/></td>
                <td>{itemdata.instructor}</td>
                <td>{itemdata.price}</td>
                <td>{itemdata.students}</td>
                <td>{itemdata.classRoom}</td>
                <td>{itemdata.start_date}</td>
                <td>{itemdata.end_date}</td>
                <td>{itemdata.day}</td>
                <td>{itemdata.start_time}</td>
                <td>{itemdata.end_time}</td>
                <td>{itemdata.part}</td>
                <td>{itemdata.office}</td>
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

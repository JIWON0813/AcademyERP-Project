import React, {Component} from "react";
import axios from "axios";
import './table.css';
import NoticeWrite from "./NoticeWrite";
import Notice from "./Notice";

class NoticeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        noticeList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      noticeList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/notice")
        .then(res => {
            this.setState({
              noticeList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { noticeList } = this.state;

    return (
      <div>{
        <header>
        <NoticeWrite stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        }
        <br></br>
        <table>
        <thead>
          <tr>
            <td>NO</td><td>TITLE</td><td>WRITER</td><td>DATE</td><td>HITS</td>
          </tr>
        </thead>
        <tbody>
         {noticeList&&noticeList.map((noticedata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{noticedata.no}</td>
                <td> <Notice stateRefresh={this.stateRefresh} id={noticedata.no}/></td>
                <td>{noticedata.address}</td>
                <td>{noticedata.hp}</td>
                <td>{noticedata.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default NoticeList;

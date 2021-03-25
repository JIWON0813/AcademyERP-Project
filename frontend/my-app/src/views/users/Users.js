import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../Template/css/table.css';


class Users extends Component {
  constructor(props) {//prop==>상위 읽기만 가능 , state==>읽기 쓰기 가능,
    super(props)
    this.state = {
        userList: "",
        depList: ""
    }
  }

  componentDidMount() {
      this.getApi();
  }

  getApi = () => {
      axios.get("http://localhost:8080/api/usersT").then(res => {
        console.log(res);
        this.setState({
          userList: res.data.list
        })
      }).catch(res => console.log(res))
      axios.get("http://localhost:8080/api/depart").then(res => {
        console.log(res);
        this.setState({
          depList: res.data.depart
        })
      }).catch(res => console.log(res))
  }


    render() {
      const { userList } = this.state;
      const { depList } = this.state;
      return (
      <div>
        <table  class="default">
        <thead>
          <tr  class="default"><td class="default">NO</td><td  class="default">NAME</td><td  class="default">ID</td><td  class="default">password</td><td  class="default">HP</td><td  class="default">ADDRESS</td>
          <td  class="default">E-MAIL</td><td  class="default">BIRTH</td><td  class="default">SEX</td><td  class="default">RANK</td><td  class="default">SAL</td><td  class="default">DEPART</td><td  class="default">BRANCH</td>
          <td class="default">PROFILE</td><td class="default">VERIFY</td><td class="default">DATE</td></tr>
        </thead>
        <tbody>
         {userList&&userList.map((items) => {
            return (
            <tr class="default">
                <td class="default">{items.no}</td>
                <td class="default"><Link to={`/users/${items.no}`}>{items.name}</Link></td>
                <td class="default">{items.id}</td>
                <td class="default">{items.password}</td>
                <td class="default">{items.hp}</td>
                <td class="default">{items.address}</td>
                <td class="default">{items.email}</td>
                <td class="default">{items.birth}</td>
                <td class="default">{items.sex}</td>
                <td class="default">{items.rank}</td>
                <td class="default">{items.salary}</td>
                {depList&&depList.map((dep)=>{
                  if(dep.no===Number(items.department)){
                    return(<td class="default">{dep.name}</td>);
                  }else{
                    return("");
                  }
                })}
                <td class="default">{items.branch}</td>
                <td class="default">{items.profile_name}</td>
                <td class="default">{items.verify}</td>
                <td class="default">{items.regidate}</td>
                <td class="default"><Link to={`/logintest/0/${items.no}/${items.name}/${items.department}/${items.branch}`}>로그인</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Users;

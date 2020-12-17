import React, { Component } from "react";
import axios from "axios";
  
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        List: ""
    }
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
    axios.get("http://localhost:8080/api/user?id="+params.id)
        .then(res => {
            console.log(res);
            this.setState({
              List: res.data.list
            })
        })
        .catch(res => console.log(res))
}

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const tempStyle={float:"left"}
    const tempStyle2={float:"right"}
    
    const { List } = this.state;
    console.log(List);
    return (
      <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
          <div style={tempStyle}>
            <h3>User name: {List.name}</h3>
          </div>
          <div style={tempStyle2}>
            <button onClick={this.goBack}>뒤로가기</button>
          </div>  
           
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr><td>{`NO:`}</td><td><strong>{List.no}</strong></td></tr>
                  <tr><td>{`ID:`}</td><td><strong>{List.id}</strong></td></tr>
                  <tr><td>{`PASSWORD:`}</td><td><strong>{List.password}</strong></td></tr>
                  <tr><td>{`HP:`}</td><td><strong>{List.hp}</strong></td></tr>
                  <tr><td>{`ADDRESS:`}</td><td><strong>{List.address}</strong></td></tr>
                  <tr><td>{`E-MAIL:`}</td><td><strong>{List.email}</strong></td></tr>
                  <tr><td>{`BIRTH:`}</td><td><strong>{List.birth}</strong></td></tr>
                  <tr><td>{`SEX:`}</td><td><strong>{List.sex}</strong></td></tr>
                  <tr><td>{`RANK:`}</td><td><strong>{List.rank}</strong></td></tr>
                  <tr><td>{`SAL:`}</td><td><strong>{List.salary}</strong></td></tr>
                  <tr><td>{`DEPART:`}</td><td><strong>{List.department}</strong></td></tr>
                  <tr><td>{`BRANCH:`}</td><td><strong>{List.branch}</strong></td></tr>
                  <tr><td>{`PROFILE:`}</td><td><strong>{List.profile_name}</strong></td></tr>
                  <tr><td>{`VERIFY:`}</td><td><strong>{List.verify}</strong></td></tr>
                  <tr><td>{`DATE:`}</td><td><strong>{List.regidate}</strong></td></tr>
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    );
  }
}

export default Users;

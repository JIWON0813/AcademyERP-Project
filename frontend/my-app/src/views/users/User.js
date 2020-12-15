import React, { Component } from "react";
import axios from "axios";
  
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: ""
    }
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  const { params } = this.props.match;
    axios.get("http://localhost:8083/api/user?id="+params.id)
        .then(res => {
            console.log(res);
            this.setState({
              ItemList: res.data.message
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
    
    const { ItemList } = this.state;
    console.log(ItemList);
    return (
      <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
          <div style={tempStyle}>
            <h3>User name: {ItemList.name}</h3>
          </div>
          <div style={tempStyle2}>
            <button onClick={this.goBack}>뒤로가기</button>
          </div>  
           
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr><td>{`NO:`}</td><td><strong>{ItemList.no}</strong></td></tr>
                  <tr><td>{`ID:`}</td><td><strong>{ItemList.id}</strong></td></tr>
                  <tr><td>{`PASSWORD:`}</td><td><strong>{ItemList.password}</strong></td></tr>
                  <tr><td>{`HP:`}</td><td><strong>{ItemList.hp}</strong></td></tr>
                  <tr><td>{`ADDRESS:`}</td><td><strong>{ItemList.address}</strong></td></tr>
                  <tr><td>{`E-MAIL:`}</td><td><strong>{ItemList.email}</strong></td></tr>
                  <tr><td>{`BIRTH:`}</td><td><strong>{ItemList.birth}</strong></td></tr>
                  <tr><td>{`SEX:`}</td><td><strong>{ItemList.sex}</strong></td></tr>
                  <tr><td>{`RANK:`}</td><td><strong>{ItemList.rank}</strong></td></tr>
                  <tr><td>{`SAL:`}</td><td><strong>{ItemList.salary}</strong></td></tr>
                  <tr><td>{`DEPART:`}</td><td><strong>{ItemList.department}</strong></td></tr>
                  <tr><td>{`BRANCH:`}</td><td><strong>{ItemList.branch}</strong></td></tr>
                  <tr><td>{`PROFILE:`}</td><td><strong>{ItemList.profile_name}</strong></td></tr>
                  <tr><td>{`VERIFY:`}</td><td><strong>{ItemList.verify}</strong></td></tr>
                  <tr><td>{`DATE:`}</td><td><strong>{ItemList.regidate}</strong></td></tr>
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

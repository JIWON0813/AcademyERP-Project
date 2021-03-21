import React, {Component} from 'react'
import ApiService from "../../ApiService";


class StandByAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    ApiService.standByAuth().then(res => {
      this.setState({});
    });
  }

  render() {

    const {employeeList, currentPage, size} = this.state;

    return (
      <div>
        <h1>현재 승인 대기 중 입니다.</h1>
        현재 승인 대기 중 입니다.
        자세한 문의는 인사팀 또는 관리자에게 문의해주세요.
      </div>
    );
  }
}

export default StandByAuth

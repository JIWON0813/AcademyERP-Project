import React from 'react';
import axios from "axios";

class CancelPay extends React.Component {
  cancelPay = () => {
    console.log(this.props.reason)
    axios.post('http://localhost:8080/payments/cancel',
      {
        impUID:this.props.product.impUID,
        cancel_request_amount: this.props.product.paidAmount, // 환불금액
        reason: this.props.reason, // 환불사유
    }).then(response => { // 환불 성공시 로직
      alert("환불 성공");
      this.props.stateRefresh();
    }).catch(error => { // 환불 실패시 로직
      alert("환불 실패");
    });
  }


  render() {
    return <button onClick={this.cancelPay}>환불하기</button>;
  }
}

export default CancelPay;

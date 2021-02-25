import React from 'react';
import axios from "axios";

class RequestPay extends React.Component {
    requestPay = () => {
    let IMP = window.IMP;

    IMP.init("imp44109862");
      IMP.request_pay({
          pg: "html5_inicis",
          pay_method: 'card',
          merchant_uid: 'merchant_' + new Date().getTime(),
          name: '과목명:' + this.props.product.lectureName,
          amount: this.props.product.price,
          buyer_email: this.props.product.email,
          buyer_name: this.props.product.name,
          buyer_tel: this.props.product.hp,
          buyer_addr: this.props.product.address,
          custom_data: this.props.product.no,
        },
        function (rsp) { // callback
          if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
            // jQuery로 HTTP 요청
            axios.post('http://localhost:8080/payments/pay',
              {
                impUID: rsp.imp_uid,
                merchantUID: rsp.merchant_uid,
              }).then(res => {
              alert("결제결과 : "+res.data);
              window.location.reload();
            })
          } else {
            alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);

          }
        })
  }


  render() {
    return (
      <button onClick={this.requestPay}>결제하기</button>
    );
  }
}

export default RequestPay;

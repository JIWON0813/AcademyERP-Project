//-----------------------
// 제목 : 수납관리 페이지
// 파일명 : receive.js
// 작성자 : 최인아
// 작성일 : 2021-01-28
//-----------------------
import React, {Component} from "react";
class receive extends Component {

  render() {

    return (
      <div>
          <header>수납관리</header>
          <hr></hr>
          <table width="900">
              <tr align="center">
                  <th>학생성명</th>
                  <th>강의명</th>
                  <th>납부일</th>
                  <th>납부금액</th>
                  <th>미납금액</th>
                  <th>납부여부</th>
                  <th>연락처</th>
              </tr>
                <br></br>
                <br></br>
              <tr> 
			    <td colspan="7">
				    등록된 게시글이 없습니다.
			    </td>
		    </tr>
          </table>
      </div>
    )
  }
}

export default receive;

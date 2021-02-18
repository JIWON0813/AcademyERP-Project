import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { CCol, CFormGroup, CInput, CLabel } from '@coreui/react';
import axios from 'axios';
import {
  CDataTable
} from '@coreui/react'
import PaymentInsert from "../../payment/insert/insert"


let fields = ['no', 'employee_no', 'start_day', 'end_day', 'use_vacation' , 'day', '수정'];

export default class Apply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      page: "",
      open: "",
      no: "",
      startDay: "",
      endDay: "",
      days: "",
      seleted:""
    }

  }

  componentDidMount() {
    this.getData();
  }


  onChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };



  getData = () => {
    axios.get("http://localhost:8080/Vacation_apply/1/10")
      .then(res => {
        console.log(res);
        let list = res.data.list;
        let page2 = res.data.page;
        for (let i = 0; i < list.length; i++) {
          let temp = {
            no: list[i].no,
            employee_no: list[i].employee_no,
            start_day: list[i].start_day,
            end_day: list[i].end_day,
            use_vacation: list[i].use_vacation,
            day: list[i].day,
            수정: list[i].no
          }
          list[i] = temp
        }
        console.log(list);
        this.setState({
          data: list,
          page: page2,
          user: res.data.user
        })
      })
      .catch(res => console.log(res))
  }


  handleClickOpen = (item) => {
    this.setState({
      open: true,
      no: item.no,
      startDay: item.start_day,
      endDay: item.end_day,
      day: item.day,
      seleted:item.use_vacation
    })
  };


  handleClose = () => {
    this.setState({
      open: false,
      open2: false,
      open3: false
    })
  };


  del = () => {
    axios({
      url: 'http://localhost:8080/Vacation_apply/' + this.state.no,
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        console.log(response)
        alert("삭제");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  update = () => {
    axios({
      url: 'http://localhost:8080/Vacation_apply',
      method: "PUT",
      headers: { 'content-type': 'application/json' },
      data: {
        no: this.state.no,
        start_day: this.state.startDay,
        end_day: this.state.endDay,
        day: this.state.day,
        use_vacation: this.state.seleted
      }
    })
      .then(function (response) {
        console.log(response)
        alert("등록완료");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  makeMap = (start, end) => { //배열 만드는 함수
    var result = [];
    for (var i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

   selChange = () => { //몇줄로 볼지 
    var sel = document.getElementById('cntPerPage').value;
    this.movePage(1, sel)
  }
   pageChange = (selPage) => { //페이지 이동 클릭
    this.movePage(selPage, this.page.cntPerPage)
  }
   nextpage = () => { //다음 페이지
    this.movePage(this.page.endPage + 1, this.page.cntPerPage)
  }
   prevpage = () => { //이전 페이지
    this.movePage(this.page.startPage - 1, this.page.cntPerPage)
  }
   movePage = (nowpage, perpage) => { //페이지 이동
    let add = "http://localhost:8080/Vacation_apply/" + nowpage + "/" + perpage;

    axios.get(add)
    .then(res => {
      console.log(res);
      let list = res.data.list;
      let page2 = res.data.page;
      for (let i = 0; i < list.length; i++) {
        let temp = {
          no: list[i].no,
          employee_no: list[i].employee_no,
          start_day: list[i].start_day,
          end_name: list[i].end_day,
          use_vacation: list[i].use_vacation,
          수정: 1
        }
        list[i] = temp
      }
      console.log(list);
      this.setState({
        data: list,
        page: page2,
        user: res.data.user
      })
    })
    .catch(res => console.log(res))
  }

  
  render(){
    return (
      <div>
        <div>
          <div align="right">
            <PaymentInsert kind={"vacation_apply"} data={this.state.data}/>           
          </div>
  
          <div style={{ float: "right" }}>
            <select id="cntPerPage" name="sel" onChange={() => { this.selChange() }}>
              <option value="5">5줄 보기</option>
              <option value="10" selected="selected">10줄 보기</option>
              <option value="15">15줄 보기</option>
              <option value="20">20줄 보기</option>
            </select>
          </div>
  
          <div>
            <CDataTable
              items={this.state.data}
              fields={this.state.fields}
              itemsPerPage={this.state.page.cntPerPage}
              pagination
              scopedSlots={{
                '수정':
                (item) => (
                  <td>
                    <strong onClick={()=>this.handleClickOpen(item)}>
                      수정
                    </strong>
                  </td>
                ),
              }}
            />
          </div>
  
  
          <nav aria-label="pagination">
            <ul class="pagination justify-content-center">
              {this.state.page.startPage !== 1 ?
                <li onClick={() => this.prevpage()} class="page-item disabled"><a class="disabled page-link" aria-label="Go to previous page" aria-disabled="true">‹</a></li> : ""} {/*이전 */}
              {this.makeMap(this.state.page.startPage, this.state.page.endPage).map((i) => {
                if (this.state.page.nowPage === i) {
                  return (<li class="active page-item"><a class="page-link" aria-label="Current page 1">{i}</a></li>);
                } else {
                  return (<li onClick={() => this.pageChange(i)} class=" page-item"><a class="page-link" aria-label="Go to page 2">{i}</a></li>)
                }
              })}
              {this.state.page.endPage !== this.state.page.lastPage ? <li class="page-item" onClick={() => this.nextpage()}><a class="page-link" aria-label="Go to next page" aria-disabled="false">›</a></li> : ''} {/*다음 */}
            </ul>
          </nav>
          
          <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>휴가 신청</DialogTitle>
          <DialogContent>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">start</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" name="startDay" placeholder="start_day" value={this.state.startDay}
                  onChange={this.onChange} />
              </CCol>
              
              <CCol md="3">
                <CLabel htmlFor="start_date">end</CLabel>
              </CCol>
              <CCol xs="12" md="9">
              <CInput type="date" name="endDay" placeholder="end_day" value={this.state.endDay}
                  onChange={this.onChange} />{this.state.endDay}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">등록날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput readOnly name="day" value={this.state.day}onChange={this.onChange} />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="start_date">사용 휴가</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                 <CInput name="seleted" value={this.state.seleted}onChange={this.onChange} /> 
              </CCol>
              
            </CFormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.update}>수정</Button>
            <Button variant="contained" color="primary" onClick={this.del}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
         
        </div>
      </div>
    );
  }
  
}

import React, { useState, useEffect } from 'react';
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
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { element } from 'prop-types';


let fields = ['no', 'employee_no', 'day', 'name', '수정'];
let payselect = 1;


const Info = () => {
  const [inputs, setInputs] = useState({
    data: "",
    employeeNo: "",
    day: "",
    name: "",
    page: "",
    open: "",
    open2: "",
    open3: ""
  });

  useEffect(() => {
    getData();
  }, []);

  const { name, nickname, open, open2, day, page, data, employeeNo, selected , open3 } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  const getData = () => {
    axios.get("http://localhost:8080/getVacation/1/10")
      .then(res => {
        console.log(res);
        let list = res.data.list;
        let page2 = res.data.page;
        for (let i = 0; i < list.length; i++) {
          let temp = {
            no: list[i].no,
            employee_no: list[i].employee_no,
            day: list[i].day,
            name: list[i].name,
            수정: 1
          }
          list[i] = temp
        }
        console.log(list);
        setInputs({
          data: list,
          page: page2
        })
      })
      .catch(res => console.log(res))
  }

  const eventClick = (info) => {
    let { events } = this.state;
    let color;
    for (let i = 0; i < events.length; i++) {
      if (Number(events[i].id) === Number(info.event.id)) {
        color = events[i].color
      }
    }
  }

  const handleClickOpen = () => {
    setInputs({
      open: true,
      page: page,
      data: data
    })
  };

  const handleClose = () => {
    setInputs({
      open: false,
      open2: false,
      open3: false,
      page: page,
      data: data
    })
  };

  const insert = () => {
    axios({
      url: 'http://localhost:8080/Vacation',
      method: "POST",
      headers: { 'content-type': 'application/json' },
      data: {
        employee_no: employeeNo,
        day: day,
        name: name
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

  const del = () => {
    axios({
      url: 'http://localhost:8080/Calendar/' + this.state.no,
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
      data: {
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        color: this.state.color
      }
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

  const update = () => {
    axios({
      url: 'http://localhost:8080/Calendars',
      method: "PUT",
      headers: { 'content-type': 'application/json' },
      data: {
        id: this.state.no,
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        color: this.state.color,
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

  const makeMap = (start, end) => { //배열 만드는 함수
    var result = [];
    for (var i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  const selChange = () => { //몇줄로 볼지 
    var sel = document.getElementById('cntPerPage').value;
    movePage(1, sel)
  }
  const pageChange = (selPage) => { //페이지 이동 클릭
    movePage(selPage, page.cntPerPage)
  }
  const nextpage = () => { //다음 페이지
    movePage(page.endPage + 1, page.cntPerPage)
  }
  const prevpage = () => { //이전 페이지
    movePage(page.startPage - 1, page.cntPerPage)
  }
  const movePage = (nowpage, perpage) => { //페이지 이동
    let add = "http://localhost:8080/getVacation/" + nowpage + "/" + perpage;

    axios.get(add)
      .then(res => {
        console.log(res);
        let list = res.data.list;
        let page = res.data.page;
        for (let i = 0; i < list.length; i++) {
          let temp = {
            no: list[i].no,
            employee_no: list[i].employee_no,
            day: list[i].day,
            name: list[i].name,
            수정: 1
          }
          list[i] = temp
        }
        console.log(list);
        setInputs({
          data: list,
          page: page
        })
      })
      .catch(res => console.log(res))
  }

  const payment = () => {
    let count = document.getElementsByName("check").length;
    let temp = [];
    for (var i = 0; i < count; i++) {
      if (document.getElementsByName("check")[i].checked === true) {
        for (var l = 0; l < data.length; l++) {
          if (Number(data[l].no) === Number(document.getElementsByName("check")[i].value)) {
            console.log(1)
            temp.push(data[l])
          }
        }
      }
    }
    console.log(temp)
    setInputs({
      open2: true,
      page: page,
      data: data,
      selected: temp
    })
  }

  const select = () => {
    payselect *= -1;
    let list = data;
    setInputs({
      data: list,
      page: page
    })
  }

  const vacationUse = () => {
    setInputs({
      open3: true,
      page: page,
      data: data,
    })
  }


  return (
    <div>
      <div>
        <div align="right">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            추가하기
          </Button>

          <Button variant="contained" color="primary" onClick={select}>
            선택
          </Button>

          <Button variant="contained" color="primary" onClick={payment}>
            결제
          </Button>
          <Button variant="contained" color="primary" onClick={vacationUse}>
            휴가 사용
          </Button>
        </div>

        <div style={{ float: "right" }}>
          <select id="cntPerPage" name="sel" onChange={() => { selChange() }}>
            <option value="5">5줄 보기</option>
            <option value="10" selected="selected">10줄 보기</option>
            <option value="15">15줄 보기</option>
            <option value="20">20줄 보기</option>
          </select>
        </div>

        <div>
          <CDataTable
            items={data}
            fields={fields}
            itemsPerPage={page.cntPerPage}
            pagination
            scopedSlots={{
              '수정':
                (item) => (
                  <td>
                    <a href="naver.com">
                      {item.수정}
                    </a>
                  </td>
                ),
              'no':
                (item) => (
                  <td>
                    {payselect === 1 ?
                      <div>
                        {item.no}
                      </div>
                      :
                      <div>
                        <input type="checkbox" name="check" value={item.no} />
                      </div>
                    }
                  </td>
                ),
            }}
          />
        </div>


        <nav aria-label="pagination">
          <ul class="pagination justify-content-center">
            {page.startPage !== 1 ?
              <li onClick={() => prevpage()} class="page-item disabled"><a class="disabled page-link" aria-label="Go to previous page" aria-disabled="true">‹</a></li> : ""} {/*이전 */}
            {makeMap(page.startPage, page.endPage).map((i) => {
              if (page.nowPage === i) {
                return (<li class="active page-item"><a class="page-link" aria-label="Current page 1">{i}</a></li>);
              } else {
                return (<li onClick={() => pageChange(i)} class=" page-item"><a class="page-link" aria-label="Go to page 2">{i}</a></li>)
              }
            })}
            {page.endPage !== page.lastPage ? <li class="page-item" onClick={() => nextpage()}><a class="page-link" aria-label="Go to next page" aria-disabled="false">›</a></li> : ''} {/*다음 */}
          </ul>
        </nav>
        <Dialog open={open2} onClose={handleClose}>
          <DialogTitle>결제 하기</DialogTitle>
          <DialogContent>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">User</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="employeeNo" placeholder="이름" value={employeeNo}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">일수</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <table>
                  <th>no</th>
                  <th>E_no</th>
                  <th>day</th>
                  <th>name</th>
                  {selected && selected.map((i) => {
                    return (
                      <tr>
                        <td>{i.no}</td>
                        <td>{i.employee_no}</td>
                        <td>{i.day}</td>
                        <td>{i.name}</td>
                      </tr>
                    )
                  })}
                </table>
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="start_date">내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="name" placeholder="내용" value={name}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={insert}>추가</Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>휴가 추가하기</DialogTitle>
          <DialogContent>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">User</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="employeeNo" placeholder="이름" value={employeeNo}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">일수</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="day" placeholder="일수" value={day}
                  onChange={onChange} />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="start_date">내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="name" placeholder="내용" value={name}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={insert}>추가</Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open3} onClose={handleClose}>
          <DialogTitle>휴가 추가하기</DialogTitle>
          <DialogContent>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">User</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="employeeNo" placeholder="이름" value={employeeNo}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">일수</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="day" placeholder="일수" value={day}
                  onChange={onChange} />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="start_date">내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="name" placeholder="내용" value={name}
                  onChange={onChange} />
              </CCol>
            </CFormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={insert}>추가</Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default Info;
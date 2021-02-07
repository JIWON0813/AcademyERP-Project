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
import {CDataTable} from '@coreui/react'
import Moment from 'moment';


let fields = ['no', 'day', 'name'];
let payselect = 1;


const Info = () => {
  const [inputs, setInputs] = useState({
    data: "",
    page: "",
    open: "",
    elesected: "",
    days: "",
    startDay:"",
    endDay: ""
  });

  useEffect(() => {
    getData();
  }, []);

  const {  open, page, data, days,selected,startDay,endDay } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
    if(name==="startDay"){
      check_start(e)
    }
  
  };


  const getData = () => {
    axios.get("http://localhost:8080/getVacation/1/10/"+window.sessionStorage.getItem('no'))
      .then(res => {
        console.log(res);
        let list = res.data.list;
        let page2 = res.data.page;
        for (let i = 0; i < list.length; i++) {
          let temp = {
            no: list[i].no,
            day: list[i].day,
            name: list[i].name
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

  const handleClose = () => {
    setInputs({
      open: false,
      page: page,
      data: data
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
    let add = "http://localhost:8080/getVacation/" + nowpage + "/" + perpage+"/"+window.sessionStorage.getItem('no');

    axios.get(add)
    .then(res => {
      console.log(res);
      let list = res.data.list;
      let page2 = res.data.page;
      for (let i = 0; i < list.length; i++) {
        let temp = {
          no: list[i].no,
          day: list[i].day,
          name: list[i].name
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

  const select = () => {
    payselect *= -1;
    let list = data;
    setInputs({
      data: list,
      page: page
    })
  }

  const vacationUse = () => {
    var check_count = document.getElementsByName("check").length;
    if(check_count<1){
      alert("휴가를 선택해주세요")
      return
    }
    let selectDay = 0;
    let select=[];
    for (var i=0; i<check_count; i++) {
      if (document.getElementsByName("check")[i].checked === true) {
        select.push(document.getElementsByName("check")[i].value+"/")
        for(let l=0;l<data.length;l++){
          if(Number(document.getElementsByName("check")[i].value) === Number(data[l].no)){
            selectDay+=data[l].day
          }
        } 
      }
    }
    setInputs({
      open: true,
      page: page,
      data: data,
      days: selectDay,
      selected: select
    })
  }

  const check_start = (e) =>{
    var start = Moment(e.target.value).format("YYYY-MM-DD");
    let now = Moment().format("YYYY-MM-DD");
    if(start<=now){
      alert("오늘 이후로 지정해주세요.")
      setInputs({
        open: true,
        page: page,
        data: data,
        days: days,
        selected: selected,
        startDay: "",
        endDay: endDay
      })
    }else{
      let end=Moment(e.target.value).add(days-1, 'days').format("YYYY-MM-DD")
      setInputs({
        open: true,
        page: page,
        data: data,
        days: days,
        selected: selected,
        startDay: e.target.value,
        endDay: end
      })
    }
  }

  const apply = () =>{
    axios({
      url: 'http://localhost:8080/Vacation_apply',
      method: "POST",
      headers: { 'content-type': 'application/json' },
      data: {
        employee_no: window.sessionStorage.getItem('no'),
        start_day: startDay,
        end_day: endDay,
        use_vacation: String(selected)
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
  }



  return (
    <div>
      <div>
        <div align="right">
          <Button variant="contained" color="primary" onClick={select}>
            선택
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
        


        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>휴가 신청</DialogTitle>
          <DialogContent>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">start</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" name="startDay" placeholder="day" value={startDay}
                  onChange={onChange} />
              </CCol>
              
              <CCol md="3">
                <CLabel htmlFor="start_date">end</CLabel>
              </CCol>
              <CCol xs="2" md="9">
                <CInput type="date" name="endDay" placeholder="day" value={endDay}
                  />
                  
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">일수</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {days}
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="start_date">사용 휴가</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {selected}
              </CCol>
              
            </CFormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={apply}>추가</Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>

        
      </div>
    </div>
  );
}
export default Info;
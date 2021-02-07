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

  const {  open, open2, day, page, data, employeeNo, selected , open3 } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
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
      open: true,
      page: page,
      data: data,
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
        

        
      </div>
    </div>
  );
}
export default Info;
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {CCol, CFormGroup, CInput, CLabel} from '@coreui/react';
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

const fields = ['no','employee_no', 'day', 'name', '수정']


const Info = () => {
    const [inputs, setInputs] = useState({
        data: "",
    });

    useEffect(() => {
      getData();
    }, []); 

    const { name, nickname, open, open2,no, title,start,end,events,color,data } = inputs;
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
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    
    const getData = () =>{
      axios.get("http://localhost:8080/getVacation")
        .then(res => {
            console.log(res);
            let list=res.data.list;
            for(let i=0;i<list.length;i++){
              let temp={
                no: list[i].no,
                employee_no: list[i].employee_no,
                day: list[i].day,
                name: list[i].name,
                수정: 1
              }
              list[i]=temp
            }
            console.log(list);
            setInputs({
              data: list
            })
        })
        .catch(res => console.log(res))
    }

    const eventClick=(info)=> { 
        let {events} = this.state;
        let color;
        for(let i=0;i<events.length;i++){
          if(Number(events[i].id)===Number(info.event.id)){
            color=events[i].color
          }
        }
    }
    
    const handleClickOpen=()=> {
        setInputs({
            open:true
        })
    };
      
    const handleClose=()=> {
      setInputs({
        open:false
    })
    };
    
  
    const insert = () => {
        axios({
          url: 'http://localhost:8080/Calendar',
          method: "POST",
          headers: {'content-type': 'application/json'},
          data: {
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
            color: this.state.color
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
    
    const del = () =>{
    axios({
        url: 'http://localhost:8080/Calendar/'+this.state.no,
        method: "DELETE",
        headers: {'content-type': 'application/json'},
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

    const update = () =>{
    axios({
        url: 'http://localhost:8080/Calendars',
        method: "PUT",
        headers: {'content-type': 'application/json'},
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


    return (
        <div>
        <input name="name" placeholder="이름" onChange={onChange} value={name} />
        <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: </b>
            {name} ({nickname})
        </div>
        <div>
        
        <div align="right">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            추가하기
          </Button>
        </div>

        <div>
            <CDataTable
              items={data}
              fields={fields}
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                '수정':
                  (item)=>(
                    <td>
                      <a href="naver.com">
                      {item.수정}
                      </a>
                    </td>
                  )

              }}
            />
        </div>
       

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>일정 수정</DialogTitle>
            <DialogContent>          
              <CFormGroup row>
                <CCol xs="12" md="9">
                  <CInput name="title" placeholder="일정" value={title}
                          onChange={handleChange}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="start_date">일정 시작</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="start_date" name="start" placeholder="일정 시작" value={start}
                          onChange={handleChange}/>
                </CCol>
              </CFormGroup>
              
          </DialogContent>
  
     
        </Dialog>

       
    </div>
        </div>



        
    );
} 
export default Info;
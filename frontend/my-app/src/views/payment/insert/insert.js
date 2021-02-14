import React, { Component } from "react";
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { CCol, CFormGroup, CInput, CLabel, CSelect, CTextarea } from '@coreui/react';
import {
  CDataTable
} from '@coreui/react'


let payselect = 1;
let fields;

export default class insert extends Component {
    state = {
        selected:[],
        paymentOpen: false ,
        user:"",
        paymentPlayerArr: [0],
        title:"",
        contents:"",
        column:[],
        player:""
    }

    onChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };
    

    paymentPlayerAdd = () =>{
        let index = this.state.paymentPlayerArr.length+1;
        let temp =[];
        for(var i=0;i<index;i++){
            temp.push(i)
        }
        this.setState({
            paymentPlayerArr: temp,
        })
    }
    
    paymentPlayerSub = () =>{
    let index = this.state.paymentPlayerArr.length-1;
    let temp =[];
    for(var i=0;i<index;i++){
        temp.push(i)
    }
    this.setState({
        paymentPlayerArr: temp,
    })
    }

    componentDidMount() {
        this.getUsers()
    }



    getUsers(){
        axios.get("http://localhost:8080/paymentUsers")
        .then(res => {
            console.log(res);
            this.setState({
                user:res.data.user
            })
        })
        .catch(res => console.log(res))
    }

    select = () => {
        if(payselect>0){
            let table = document.getElementsByTagName('table')[0]

            for(let i=1;i<table.rows.length;i++){
                table.rows[i].cells[0].innerHTML = "<td><input type='checkbox' name='check' value="+table.rows[i].cells[0].innerText+"></td>"
            }
        }else{
            let table = document.getElementsByTagName('table')[0]
            let values= document.getElementsByName("check")
            for(let i=1;i<table.rows.length;i++){
                table.rows[i].cells[0].innerHTML = "<td>"+values[0].value+"</td>"
            }
        }
        payselect *= -1;
    }

    payment = () => {
        let count = document.getElementsByName("check").length;
        let temp = [];
        
        
        for (var i = 0; i < count; i++) {
          if (document.getElementsByName("check")[i].checked === true) {
            for (var l = 0; l < this.props.data.length; l++) {
              if (Number(this.props.data[l].no) === Number(document.getElementsByName("check")[i].value)) {
                temp.push(this.props.data[l])
              }
            }
          }
        }
        if(temp.length<1){
            alert("선택을 누르고 결제할 내용을 체크해주세요");return false;
        }
        this.setState({
            paymentOpen: true,
            selected: temp
        })   
        let field = Object.keys(this.props.data[0])
        if(field[field.lastIndex]==='수정'){
            field.pop()
        }
        fields=field
    }
    handleClose = () => {
        this.setState({
            paymentOpen: false
        })
    };

    insertNullCheck = () =>{
        for (var i = 0; i < document.getElementsByName("player").length; i++) {
            if(document.getElementsByName("player")[i].value===null||document.getElementsByName("player")[i].value===""){
                alert("결제할1");return false;
            }
        }
        if(this.state.title.length<1){
            alert("title를 입력 해주세요");return false;
        }else if(this.state.contents.length<1){
            alert("content를 입력 해주세요");return false;
        }
        return true;
    }

    insert = () => {
        if(!this.insertNullCheck()){
            return 0;
        }
        let playerTemp = "";
        let kindsTemp = "";

        for (var i = 0; i < document.getElementsByName("player").length; i++) 
            playerTemp+=document.getElementsByName("player")[i].value+"/"
        for (var l=0;l<this.state.selected.length;l++){
            kindsTemp += this.state.selected[l].no+"/"
        }

        axios({
        url: 'http://localhost:8080/payment',
        method: "POST",
        headers: { 'content-type': 'application/json' },
        data: {
            employee_no: window.sessionStorage.getItem("no"),
            player: playerTemp,
            title: this.state.title,
            contents: this.state.contents,
            kinds: this.props.kind,
            kinds_no: kindsTemp
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

    selectCheck = () => {
        let count = document.getElementsByName("player").length;
        let playerTemp = [];

        for (var i = 0; i < count; i++) 
            playerTemp.push(Number(document.getElementsByName("player")[i].value))

        this.setState({
            player:playerTemp
        })
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.select}>선택</Button>
                <Button variant="contained" color="primary" onClick={this.payment}>결제</Button>    

                <Dialog open={this.state.paymentOpen} onClose={this.handleClose}>
                    <DialogTitle>결제 하기</DialogTitle>
                    <DialogContent>
                    <CFormGroup row>
                        <CCol md="3">
                        <CLabel htmlFor="start_date">title</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                        <CInput name="title" placeholder="이름" value={this.state.title}
                            onChange={this.onChange} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                        <CLabel htmlFor="start_date">player</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                        <div>
                        <div>
                            {this.state.paymentPlayerArr&&this.state.paymentPlayerArr.map((i)=>{
                            return(
                                <CSelect type="select"name="player" placeholder="결제할 사람" onChange={this.selectCheck} >
                                    <option value="">선택</option>
                                    {this.state.user&&this.state.user.map((index)=>{
                                        if(this.state.player.indexOf(index.no)<0){
                                            return(
                                                <option value={index.no}>{index.no}. {index.name}</option>
                                            )
                                        }else{
                                            return(
                                                <option value={index.no} disabled>{index.no}. {index.name} (Selected)</option>
                                                
                                            )
                                        }
                                    })}
                                </CSelect>
                            )
                            })}
        
                        </div>
                            <button onClick={this.paymentPlayerAdd}>추가</button>
                            <button onClick={this.paymentPlayerSub}>삭제</button>
                        </div>
                        
                        
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                        <CLabel htmlFor="start_date">table</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                        <CDataTable
                                items={this.state.selected}
                                fields={fields}
                                itemsPerPage={10}
                                pagination
                                />
                        </CCol>
                        <CCol md="3">
                        <CLabel htmlFor="start_date">contents</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                        <CTextarea name="contents" placeholder="내용" value={this.state.contents}
                            onChange={this.onChange} rows="7"/>
                        </CCol>
                    </CFormGroup>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.insert}>결제추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
  }
import React, { Component } from "react";
import {
  Button,
} from "@material-ui/core";
import axios from 'axios';



export default class insert extends Component {
    insert = () =>{
        let count = document.getElementsByName("player").length;
        let playerTemp = "";
        let kindsTemp = "";

        for (var i = 0; i < count; i++) 
            playerTemp+=document.getElementsByName("player")[i].value+"/"
        for (var l=0;l<this.props.selected.length;l++){
            kindsTemp += this.props.selected[l].no+"/"
        }

        axios({
        url: 'http://localhost:8080/payment',
        method: "POST",
        headers: { 'content-type': 'application/json' },
        data: {
            employee_no: window.sessionStorage.getItem("no"),
            player: playerTemp,
            title: this.props.title,
            contents: this.props.contents,
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

    render(){
        return(
            <Button variant="contained" color="primary" onClick={this.insert}>결제추가</Button>
        );
    }
  }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CDataTable
} from '@coreui/react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CFade,
} from '@coreui/react';

let fields = [];


const PaymentData = ({ match }) => {
    const [inputs, setInputs] = useState({
        data: "",
        table: "",
        sign: "",
        signList:[],
        playerList:[]
        
    });

    useEffect(() => {
        getData();
    }, []);

    

    const { data, table,signList ,playerList} = inputs;

    const getData = () => {
        axios.get("http://localhost:8080/payment/" + match.params.no)
            .then(res => {
                console.log(res)
                let temp = [];
                if (Number(res.data.list.kinds) === 1) {
                    for (let i = 0; i < res.data.table.length; i++) {
                        for(let l = 0; l<res.data.user.length; l++){
                            if(res.data.table[i].employee_no === res.data.user[l].no){
                                res.data.table[i].employee_no=res.data.user[l].name
                            }
                        }
                        temp.push({
                            no: res.data.table[i].no,
                            start_day: res.data.table[i].start_day,
                            end_day: res.data.table[i].end_day,
                            name: res.data.table[i].employee_no,
                        })
                    }
                    fields = ['no', 'start_day','end_day', 'name', ];
                }
                let playList=res.data.list.player.split("/");
                let userList=res.data.user;
  
                let playerLista=[];
                for(let i=0;i<playList.length;i++){
                    for(let l=0;l<userList.length;l++){
                        if(Number(playList[i])===Number(userList[l].no)){
    
                            playerLista.push(userList[l].name);
                        }
                    }
                }
                setInputs({
                    data: res.data.list,
                    table: temp,
                    sign: res.data.selectSign,
                    signList: res.data.signList,
                    playerList:playerLista
                })
            })
            .catch(res => console.log(res))
    }


 

    return (
        <div>
            
            <CCard>
                <CCardHeader>
                    <h2>{data.title}</h2>
                </CCardHeader>
                <CCardBody>
                    <CFade timeout={300}  tag="h5" className="mt-3">

                        <div style={{width: "50%",textAlign: "center"}}>
                            <CDataTable
                                items={table}
                                fields={fields}
                                itemsPerPage={10}
                                pagination
                                />
                        </div><br></br>
                        <br></br>
                        {data.contents}
                    </CFade>
                    
                </CCardBody>
                결제해야하는 사람
                <div>
                    {playerList&&playerList.map((i)=>{
                        return(<font>{i}</font>)
                    })}
                </div>
                결제한 사인
                <br></br>
                {signList&&signList.map((i)=>{
                    return(<img src={process.env.PUBLIC_URL + '/sign/'+i} alt="copy url"  width="40"height="40"/>);
                })}
            </CCard>
            
        </div>
    );
}
export default PaymentData;
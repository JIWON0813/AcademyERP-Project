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
                for (let i = 0; i < res.data.table.length; i++) {
                    for(let l = 0; l<res.data.user.length; l++){
                        if(res.data.table[i].employee_no === res.data.user[l].no){
                            res.data.table[i].employee_no=res.data.user[l].name
                        }
                    }
                }

                fields = Object.keys(res.data.table[0]);
                
                let playList=res.data.list.player.split("/");
                let userList=res.data.user;
  
                let playerLista=[];
                for(let i=0;i<playList.length;i++){
                    for(let l=0;l<userList.length;l++){
                        if(Number(playList[i])===Number(userList[l].no)){
                            playerLista.push({
                                no: playList[i],
                                name: userList[l].name
                            });
                        }
                    }
                }
                setInputs({
                    data: res.data.list,
                    table: res.data.table,
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

                        <div style={{width: "100%",textAlign: "center"}}>
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
                
                <div>
                    <table width="100%" style= {{
                                border:"1px solid black",
                                padding: 10,
                                textAlign: "center",
                                }}>
                        <tr style={{border:"1px solid black"}}>
                            {playerList&&playerList.map((i)=>{
                                return(<th style={{border:"1px solid black"}}>{i.name} 님</th>)
                            })}
                        </tr>
                        <tr style={{border:"1px solid black"}}>
                            {playerList&&playerList.map((p) => {
                                for(var i= 0;i<signList.length;i++){
                                    if(Number(p.no)===Number(signList[i].employee_no)){
                                        return(<td style={{border:"1px solid black"}}>
                                            <img src={process.env.PUBLIC_URL+'/sign/'+signList[i].filename} alt="copy url"  width="40"height="40"/>
                                            </td>);
                                    }else{
                                        return(<td style={{border:"1px solid black"}}>결재안함</td>)
                                    }
                                }
                                if(signList.length===0){
                                    return(<td style={{border:"1px solid black"}}>결재안함</td>)
                                }
                            })}
                        </tr>
                    </table>
                  
                </div>

                
            </CCard>
            
        </div>
    );
}
export default PaymentData;
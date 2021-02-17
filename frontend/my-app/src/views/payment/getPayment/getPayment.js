import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CDataTable
} from '@coreui/react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CFade,
} from '@coreui/react';

let fields = [];


const PaymentData = ({ match }) => {
    const [inputs, setInputs] = useState({
        data: "",
        table: "",
        sign: "",
        
    });

    useEffect(() => {
        getData();
    }, []);

    const paymentCheck = () =>{
        let approved = data.approved;
        let player = window.sessionStorage.getItem("no");
        approved=String(approved).split("/")
        for(let i=0;i<approved.length;i++){
            if(Number(player)===Number(approved[i])){
                return "결재 완"
            }      
        }
        return "미 결재"
    }


    const fileChangedHandler = (e) => {
        const file = new FormData();
        file.append( "file",e.target.files[0]);
        file.append( "no",window.sessionStorage.getItem("no"));
        const config = {
            headers: {
            "content-type": "multipart/form-data"
            }
        };
        axios.post(`http://localhost:8080/upload`, file, config);
        getData();
    };

    const { data, table,sign } = inputs;

    const getData = () => {
        axios.get("http://localhost:8080/payment/" + match.params.no+"/"+window.sessionStorage.getItem("no"))
            .then(res => {
                console.log(res)

                for (let i = 0; i < res.data.table.length; i++) {
                    for(let l = 0; l<res.data.user.length; l++){
                        if(res.data.table[i].employee_no === res.data.user[l].no){
                            res.data.table[i].employee_no=res.data.user[l].name
                        }
                    }
                }
                
                for(let i=0;i<res.data.column.length;i++){
                    fields.push(res.data.column[i])
                }
                
                
                setInputs({
                    data: res.data.list,
                    table: res.data.table,
                    sign: res.data.selectSign
                })
            })
            .catch(res => console.log(res))
    }

    const payment = () => {
        var params = new URLSearchParams();
        params.append('id', window.sessionStorage.getItem('no'));
        params.append('no', data.no);
        axios.post(`http://localhost:8080/payment/approved`,params)
        .then(res => {
            if(res.data){
            alert("결재 되었습니다");
            window.location.reload(false);
            }else{
            alert("이미 결재했습니다.");
            }
        })
        .catch(res => console.log(res))       
    }


    var check = paymentCheck();
    return (
        <div>
            {sign === false?
                <div className="App">
                    <input type="file"  onChange={fileChangedHandler} />
                </div>:
                <div>
                    <img src={process.env.PUBLIC_URL + '/sign/'+sign.filename} alt={process.env.PUBLIC_URL+"123"} />
                    이미지 바꾸기<input type="file"  onChange={fileChangedHandler}/>
                </div>
            }
            <CCard>
                <CCardHeader>
                    <h2>{data.title}</h2>
                </CCardHeader>
                <CCardBody>
                    <CFade timeout={300}  tag="h5" className="mt-3">

                        <div style={{textAlign: "center"}}>
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
                <CCardFooter style={{textAlign: "right"}}>
                    <div>{check}</div>
                    <CButton color="primary" onClick={payment}>결재</CButton>
                </CCardFooter>
            </CCard>
            
        </div>
    );
}
export default PaymentData;
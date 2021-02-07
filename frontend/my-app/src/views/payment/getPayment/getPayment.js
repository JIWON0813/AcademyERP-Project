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
        table: ""
    });

    useEffect(() => {
        getData();
    }, []);

    const { data, table } = inputs;

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
                            day: res.data.table[i].day+"일",
                            name: res.data.table[i].employee_no,
                            contents: res.data.table[i].name,
                        })
                    }
                    fields = ['no', 'start_day','end_day', 'name', 'contents'];
                }
                setInputs({
                    data: res.data.list,
                    table: temp
                })
            })
            .catch(res => console.log(res))
    }

    const payment = () => {
        axios.post(`http://localhost:8080/payment/approved`,{no: 1})
        .then(res => {
            if(res.data){
            alert("출근되었습니다.");
            window.location.reload(false);
            }else{
            alert("이미 출근되었습니다.");
            }
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
                        {data.contents}
                        <br></br>
                        <br></br>
                        <br></br>
                        <div style={{width: "50%",textAlign: "center"}}>
                            <CDataTable
                                items={table}
                                fields={fields}
                                itemsPerPage={10}
                                pagination
                                />
                        </div>
                    </CFade>
                </CCardBody>
                <CCardFooter style={{textAlign: "right"}}>
                    <CButton color="primary" onClick={payment}>결제</CButton>
                </CCardFooter>
            </CCard>
            
        </div>
    );
}
export default PaymentData;
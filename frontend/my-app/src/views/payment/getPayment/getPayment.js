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
    };

    const { data, table,sign } = inputs;

    const getData = () => {
        axios.get("http://localhost:8080/payment/" + match.params.no+"/"+window.sessionStorage.getItem("no"))
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
                setInputs({
                    data: res.data.list,
                    table: temp,
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
            alert("결제되었습니다");
            window.location.reload(false);
            }else{
            alert("이미 결제했습니다.");
            }
        })
        .catch(res => console.log(res))       
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };


    return (
        <div>
            {sign === false?
                <div className="App">
                    <input type="file"  onChange={fileChangedHandler} />
                </div>:
                <div>
                
                    <img src={process.env.PUBLIC_URL + '/sign/'+sign} alt="copy url" />
                </div>
            }
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
                <CCardFooter style={{textAlign: "right"}}>
                    <CButton color="primary" onClick={payment}>결제</CButton>
                </CCardFooter>
            </CCard>
            
        </div>
    );
}
export default PaymentData;
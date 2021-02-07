import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CDataTable
} from '@coreui/react'
import { Link } from 'react-router-dom';

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
                        temp.push({
                            no: res.data.table[i].no,
                            day: res.data.table[i].day,
                            name: res.data.table[i].employee_no,
                            contents: res.data.table[i].name,
                        })
                    }
                    fields = ['no', 'day', 'name', 'contents'];
                }
                setInputs({
                    data: res.data.list,
                    table: temp
                })
            })
            .catch(res => console.log(res))
    }


    return (
        <div style={{textAlign: "center"}}>
            <div style={{width: "50%",textAlign: "center"}}>
                <CDataTable
                    items={table}
                    fields={fields}
                    itemsPerPage={10}
                    pagination
                />
            </div>
        </div>
    );
}
export default PaymentData;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CDataTable
} from '@coreui/react'
import {  Link } from 'react-router-dom';

let fields = ['no','employee_no', 'title', 'day'];
let id=window.sessionStorage.no;


const PaymentData = () => {
    const [inputs, setInputs] = useState({
        data: "",
        page: ""
    });

    useEffect(() => {
      getData();
    }, []); 

    const { data, page } = inputs;
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };

    
    const getData = () =>{
      axios.get("http://localhost:8080/payment/1/10/"+id)
        .then(res => {
          console.log(res);
          let list = res.data.list;
          let user = res.data.user;
          for(let i=0;i<list.length;i++){
            for(let l=0;l<user.length;l++){
              if(list[i].employee_no===user[l].no){
                list[i].employee_no=user[l].name;
              }
            }
          }
          setInputs({
            data: list,
            page: res.data.page
          })
        })
        .catch(res => console.log(res))
    }

    
    return(
        <div>
          <CDataTable
              items={data}
              fields={fields}
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'title':
                  (item)=>(
                    <td>
                      <Link to={`/payment/${item.no}`}> {item.title}</Link>
                    </td>
                  ),
                  
              }}
            />
        </div>
    );
} 
export default PaymentData;
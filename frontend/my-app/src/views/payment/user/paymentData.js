import React, { useState, useEffect } from 'react';
import {
  CDataTable
} from '@coreui/react'
import {  Link } from 'react-router-dom';
import ApiService from 'src/ApiService';

let fields = ['no','employee_no', 'title', 'day', '결재여부'];
let id=window.sessionStorage.no;


const PaymentData = () => {
    const [inputs, setInputs] = useState({
        data: "",
        page: "",
    });

    useEffect(() => {
      getData();
    }, []); 

    const { data } = inputs;
 
    
    const getData = () =>{
      ApiService.getUserPaymentPage(id)
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
            let result = paymentCheck(list[i].approved);
            list[i].content=result
          }

          setInputs({
            data: list,
            page: res.data.page,
          })
        })
        .catch(res => console.log(res))
    }

    const paymentCheck = (approved) =>{
      let player = window.sessionStorage.getItem("no");
      approved=String(approved).split("/")
      for(let i=0;i<approved.length;i++){
          if(Number(player)===Number(approved[i])){
              return "완"
          }      
      }
      return "미"
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
                '결재여부':
                (item)=>(
                  <td>
                      {item.content}
                  </td>
                ),
              }}
            />
        </div>
    );
} 
export default PaymentData;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CDropdown,
} from '@coreui/react'
import Masage from './masage'
import * as MasageInsert from './MasageInsert.js'
let id=window.sessionStorage.no;

const TheHeaderDropdownMssg = () => {


  useEffect(() => {
  getData();
  }, []); 


  const getData = () =>{
    MasageInsert.masage("asd")
    axios.get("http://localhost:8080/payment/1/10/"+id)
      .then(res => {
        
      })
      .catch(res => console.log(res))
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <Masage
        link="링크" name="이름" time="1111" count="4"
        title="제목" contents="내용"
      />
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
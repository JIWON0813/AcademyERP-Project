import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Masage from './masage'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const id=window.sessionStorage.no;

const TheHeaderDropdownMssg = () => {
  const [inputs, setInputs] = useState({
    masageList: []
  });

  const { masageList } = inputs;

  useEffect(() => {
  getData();
  }, []); 


  const getData = () =>{
    axios.get("http://localhost:8080/masage/"+id)
      .then(res => {
        console.log(res)
        setInputs({
          masageList:res.data.masageList
        })
      })
      .catch(res => console.log(res))
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{masageList.length}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have messages</strong>
        </CDropdownItem>
        {masageList.map((index)=>{
          return(
            <Masage
              link={index.link} name={index.to} time={index.day}
              title={index.title} contents={index.contents}
            />
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
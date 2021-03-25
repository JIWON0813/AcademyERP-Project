import React, { useState, useEffect } from 'react';

import Masage from './masage'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ApiService from 'src/ApiService';

const id=window.sessionStorage.no;

const TheHeaderDropdownMssg = () => {
  const [inputs, setInputs] = useState({
    masageList: [],
    reset: 0
  });

  const { masageList, reset } = inputs;

  useEffect(() => {
    getData();
  }, []); 


  const getData = () =>{
    ApiService.getMasage(id)
      .then(res => {
        console.log(res)
        setInputs({
          masageList:res.data.masageList
        })
      })
      .catch(res => console.log(res))
  }

  const masageClick=(no)=>{
    ApiService.clickMasage(no,window.sessionStorage.getItem("no"))
        .then(res => {
          console.log(res)
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
            <CDropdownItem href={"#/"+index.link} onClick={()=>{masageClick(index.no);getData()}}>{/*href */}
            <Masage
              no={index.no}
              link={index.link} name={index.to} time={index.day}
              title={index.title} contents={index.contents}
            />
            </CDropdownItem>
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
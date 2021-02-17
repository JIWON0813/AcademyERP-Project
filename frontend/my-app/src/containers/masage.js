import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
let id=window.sessionStorage.no;

const Mssg = (props) => {

  return (
    <div
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{props.count}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have {props.name} messages</strong>
        </CDropdownItem>
            <CDropdownItem href={"#/"+props.link}>{/*href */}
            <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg 
                  src={'avatars/7.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                /> {/*프사 */}
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">{props.name}</small>{/*이름 */}
              <small className="text-muted float-right mt-1">{props.time}</small>{/**시간 */}
            </div>
            <div className="text-truncate font-weight-bold">{/*제목 */}
              <span className="fa fa-exclamation text-danger">
              </span> 
                {props.title}
            </div>
            <div className="small text-muted text-truncate">{/*내용 */}
               {props.contents}
            </div>
            </div>
        </CDropdownItem>
          


        
        <CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
      </CDropdownMenu>
    </div>
  )
}



export default Mssg
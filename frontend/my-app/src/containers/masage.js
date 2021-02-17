import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CDropdownItem,
  CImg
} from '@coreui/react'


const Mssg = (props) => {

  var arr = []
  for(var i=0;i<30;i++){
    arr.push(i);
  }
  return (
    <div>
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
              <small className="text-muted">{props.to}</small>{/*이름 */}
              <small className="text-muted float-right mt-1">{props.day}</small>{/**시간 */}
            </div>
            <div className="text-truncate font-weight-bold">{/*제목 */}
              <span className="fa fa-exclamation text-danger"></span> {props.title}
            </div>
            <div className="small text-muted text-truncate">{/*내용 */}
              {String(props.contents).length<30?
                <div>{props.contents}{arr.map(()=>{
                  return(<font>&nbsp;&nbsp;</font>)
                })}</div>
                :
                <div>{props.contents}</div>
              }
              
            </div>
          </div>
        </CDropdownItem>
    </div>
  )
}



export default Mssg
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'



const _HRD=1;
const score=3;
let HRD_login=false;
let score_login=false;
var session_dep=window.sessionStorage.getItem('dep');
var sm=[
  {
    _tag: 'CSidebarNavTitle',
    _children: ['박수민']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '인사',
    route: '/base',
    icon: 'cil-chart-pie',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Attendance',
        to: '/Attendance',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '회사 휴일관리',
        to: '/Calendar_admin',
      }
    ]
  }
];

var sm_score=[
  {
    _tag: 'CSidebarNavTitle',
    _children: ['이여진']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '학생관리(강사)',
    route: '/base',
    icon: 'cil-drop',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '성적관리',
        to: '/score',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '상담관리',
        to: '/counseling',
      },
    ]}
];

if(Number(session_dep)===_HRD){
  HRD_login=true;
}else if(Number(session_dep)===score){
  score_login = true;
}

if(HRD_login){
  score_login = false;
  for(var i=sm.length-1;i>-1;i--){
    navigation.splice(0,0,sm[i])
  }
}else if(score_login) {
  HRD_login=false;
  for (var i = sm_score.length - 1; i > -1; i--) {
    navigation.splice(0, 0, sm_score[i])
  }
}

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)

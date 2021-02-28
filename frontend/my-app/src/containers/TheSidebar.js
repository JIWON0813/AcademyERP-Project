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
let score_login=false;
var session_dep=window.sessionStorage.getItem('dep');
var HRD=[
  {
    _tag: 'CSidebarNavTitle',
    _children: ['인사팀']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '근태관리',
    route: '/base',
    icon: 'cil-chart-pie',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '근태상황',
        to: '/Attendance',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '휴가 목록',
        to: '/vacation',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '휴가 신청 목록',
        to: '/vacation_apply',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '결제 리스트',
        to: '/adpayment',
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: '회사 캘린더',
    to: '/Calendar_admin',
    icon: 'cil-calendar'
  }

];

var login=[

  {
    _tag: 'CSidebarNavDropdown',
    name: '근태',
    route: '/base',
    icon: 'cil-chart-pie',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '나의 출퇴근',
        to: '/Attendance_user',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '나의 휴가',
        to: '/vacation_user',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '결제',
    route: '/base',
    icon: 'cil-chart-pie',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '결제요청',
        to: '/payment',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '비용',
    route: '/base',
    icon: 'cil-chart-pie',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '비용등록',
        to: '/cost',
      }
    ]
  },
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

if(Number(session_dep)===score){
  score_login = true;
}

if(Number(session_dep)===_HRD){
  for(var i=HRD.length-1;i>-1;i--){
    navigation.splice(0,0,HRD[i])
  }
}else if(score_login) {
  for (i = sm_score.length - 1; i > -1; i--) {
    navigation.splice(0, 0, sm_score[i])
  }
}


if(session_dep!=null){
  for (i = login.length - 1; i > -1; i--) {
    navigation.splice(0, 0, login[i])
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

import React from 'react';
import RegisterEmployee from "./views/employee/RegisterEmployee";

const Toaster = React.lazy(() => import('./views/Template/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/Template/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/Template/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Template/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/Template/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/Template/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/Template/base/forms/BasicForms'));
const Jumbotrons = React.lazy(() => import('./views/Template/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Template/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/Template/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/Template/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/Template/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/Template/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Template/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/Template/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/Template/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/Template/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Template/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Template/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Template/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Template/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Template/charts/Charts'));
//const Dashboard = React.lazy(() => import('./views/Template/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Template/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Template/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/Template/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/Template/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/Template/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/Template/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/Template/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/Template/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/Template/widgets/Widgets'));

//세호
const Students = React.lazy(() => import('./views/Student/Students'));
const Student = React.lazy(() => import('./views/Student/Student'));
const Ins_stu = React.lazy(() => import('./views/Student/Ins_stu'));
const Edit_stu = React.lazy(() => import('./views/Student/Edit_stu'));
const Stu_att = React.lazy(() => import('./views/Stu_Att/Stu_att'));
const Ins_att = React.lazy(() => import('./views/Stu_Att/Ins_att'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const HR = React.lazy(() => import('./views/HR/HR'));
const Sal_list = React.lazy(() => import('./views/HR/SalaryList'));
const Sal_edit = React.lazy(() => import('./views/HR/SalaryEdit'));
const Teacher = React.lazy(() => import('./views/Teacher/Calendar'));
const Curriculum = React.lazy(() => import('./views/Teacher/Curriculum'));
const InsertCurriculum = React.lazy(() => import('./views/Teacher/InsertCurriculum'));

/*-여진--------------------------*/
const Lectures = React.lazy(() => import('./views/lecture/Lectures'));
const Lecture = React.lazy(() => import('./views/lecture/Lecture'));
const LectureAdd = React.lazy(() => import('./views/lecture/LectureAdd'));
const LectureDelete = React.lazy(() => import('./views/lecture/LectureDelete'));
const LectureUpdate = React.lazy(() => import('./views/lecture/LectureUpdate'));

const Score = React.lazy(() => import('./views/score/Score'));
const Counseling = React.lazy(() => import('./views/counseling/Counseling'));

const SearchStudent = React.lazy(() => import('./views/Pay/SearchStudent'));
const Statement = React.lazy(() => import('./views/statement/Statement'));

const login = React.lazy(() => import('./views/login/login'));
/*-------------------------------*/

// ------------@최인아
// ------------상담
const Consults = React.lazy(() => import('./views/consult/Consults'));
const Consult = React.lazy(() => import('./views/consult/Consult'));
const ConsultInsert = React.lazy(() => import('./views/consult/ConsultInsert'));
const ConsultUpdate = React.lazy(() => import('./views/consult/ConsultUpdate'));
// ------------공지사항
const Notices = React.lazy(() => import('./views/notice/Notices'));
const Notice = React.lazy(() => import('./views/notice/Notice'));
const NoticeWrite = React.lazy(() => import('./views/notice/NoticeWrite'));
const NoticeUpdate = React.lazy(() => import('./views/notice/NoticeUpdate'));
// ------------수납관리
const Receive = React.lazy(() => import('./views/receive/receive'));
// ------------@최인아
const Branches = React.lazy(() => import('./views/branch/Branches'));
const Branch = React.lazy(() => import('./views/branch/Branch'));
const BranchAdd = React.lazy(() => import('./views/branch/BranchAdd'));
const BranchDelete = React.lazy(() => import('./views/branch/BranchDelete'));
const BranchUpdate = React.lazy(() => import('./views/branch/BranchUpdate'));
// ------------박수민
const Attendance = React.lazy(() => import('./views/Attendance/index'));
const Calendar = React.lazy(() => import('./views/Calendar/index'));
const Calendar2 = React.lazy(() => import('./views/Calendar/index_view'));
const attUpdate = React.lazy(() => import('./views/Attendance/AttUpdate'));
const sessionLog = React.lazy(() => import('./views/users/sessionLog'));
const Attendance_user = React.lazy(() => import('./views/Attendance/index_view'));
const vacation = React.lazy(() => import('./views/vacation/index'));
const vacation_user = React.lazy(() => import('./views/vacation/index_user'));
const payment = React.lazy(() => import('./views/payment/index'));
const adpayment = React.lazy(() => import('./views/payment/admin/paymentData'));
const adpaymentget = React.lazy(() => import('./views/payment/admin/getPayment'));
const test = React.lazy(() => import('./suminCP/calendar'));
const paymentget = React.lazy(() => import('./views/payment/getPayment/getPayment'));
const vacationApply = React.lazy(() => import('./views/vacation/index_apply'));
// -------------박수민

//start Employee
const Employee = React.lazy(() => import('./views/employee/Employee'));
const SaveEmployee = React.lazy(() => import('./views/employee/RegisterEmployee'));
const StandByAuth = React.lazy(() => import('./views/employee/StandByAuth'));
//end Employee

const routes = [
  {path: '/', exact: true, name: 'Home'},
 // {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/theme', name: 'Theme', component: Colors, exact: true},
  {path: '/theme/colors', name: 'Colors', component: Colors},
  {path: '/theme/typography', name: 'Typography', component: Typography},
  {path: '/base', name: 'Base', component: Cards, exact: true},
  {path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs},
  {path: '/base/cards', name: 'Cards', component: Cards},
  {path: '/base/carousels', name: 'Carousel', component: Carousels},
  {path: '/base/collapses', name: 'Collapse', component: Collapses},
  {path: '/base/forms', name: 'Forms', component: BasicForms},
  {path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons},
  {path: '/base/list-groups', name: 'List Groups', component: ListGroups},
  {path: '/base/navbars', name: 'Navbars', component: Navbars},
  {path: '/base/navs', name: 'Navs', component: Navs},
  {path: '/base/paginations', name: 'Paginations', component: Paginations},
  {path: '/base/popovers', name: 'Popovers', component: Popovers},
  {path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar},
  {path: '/base/switches', name: 'Switches', component: Switches},
  {path: '/base/tables', name: 'Tables', component: Tables},
  {path: '/base/tabs', name: 'Tabs', component: Tabs},
  {path: '/base/tooltips', name: 'Tooltips', component: Tooltips},
  {path: '/buttons', name: 'Buttons', component: Buttons, exact: true},
  {path: '/buttons/buttons', name: 'Buttons', component: Buttons},
  {path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns},
  {path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups},
  {path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons},
  {path: '/charts', name: 'Charts', component: Charts},
  {path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons},
  {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons},
  {path: '/icons/flags', name: 'Flags', component: Flags},
  {path: '/icons/brands', name: 'Brands', component: Brands},
  {path: '/notifications', name: 'Notifications', component: Alerts, exact: true},
  {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
  {path: '/notifications/badges', name: 'Badges', component: Badges},
  {path: '/notifications/modals', name: 'Modals', component: Modals},
  {path: '/notifications/toaster', name: 'Toaster', component: Toaster},

  {path: '/widgets', name: 'Widgets', component: Widgets},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  //세호
  {path: '/students', exact: true, name: 'Students', component: Students},
  {path: '/student/:no', exact: true, name: 'Students', component: Student},
  {path: '/ins_stu', exact: true, name: 'Ins_stu', component: Ins_stu},
  {path: '/edit_stu', exact: true, name: 'Edit_stu', component: Edit_stu},

  {path: '/stu_att', exact: true, name: 'stu_att', component: Stu_att},
  {path: '/ins_att', exact: true, name: 'ins_att', component: Ins_att},

  {path: '/HR', exact: true, name: 'HR', component: HR},
  {path: '/sal_list', exact: true, name: 'sal_list', component: Sal_list},
  {path: '/sal_edit/:no', exact: true, name: 'sal_edit', component: Sal_edit},
  {path: '/teacher', exact: true, name: 'teacher', component: Teacher},
  {path: '/curriculum/:no', exact: true, name: 'teacher', component: Curriculum},
  {path: '/insertCurriculum/:no', exact: true, name: 'teacher', component: InsertCurriculum},

  /*--여진---------------------------------------*/
  {path: '/lecture', exact: true, name: 'Lectures', component: Lectures},
  {path: '/lecture/:id', exact: true, name: 'Lecture Details', component: Lecture},
  {path: '/lectureAdd', exact: true, name: 'Lecture Add', component: LectureAdd},
  {path: '/lectureDelete/:id', exact: true, name: 'Lecture Delete', component: LectureDelete},
  {path: '/lectureUpdate', exact: true, name: 'Lecture Update', component: LectureUpdate},

  {path: '/score', exact: true, name: 'Score', component: Score},
  {path: '/counseling', exact: true, name: 'Counseling', component: Counseling},

  {path: '/searchStudent', exact: true, name: 'SearchStudent', component: SearchStudent},
  {path: '/statement', exact: true, name: 'Statement', component: Statement},


  /*--여진---------------------------------------*/


  // ------------@최인아
  // ------------상담


  {path: '/consult', exact: true, name: 'Consults', component: Consults},
  {path: '/consult/:id', exact: true, name: 'Consult Details', component: Consult},
  {path: '/consultInsert', exact: true, name: 'Consult Insert', component: ConsultInsert},
  {path: '/consultUpdate', exact: true, name: 'Consult Update', component: ConsultUpdate},
  // ------------공지사항
  {path: '/notice/:id', exact: true, name: 'Notice Details', component: Notice},
  {path: '/notice', exact: true, name: 'Notices', component: Notices},
  {path: '/noticeWrite', exact: true, name: 'NoticeWrite', component: NoticeWrite},
  {path: '/noticeUpdate', exact: true, name: 'Notice Update', component: NoticeUpdate},
  // ------------수납관리
  {path: '/receive', exact: true, name: 'Receive', component: Receive},
  // ------------@최인아
  {path: '/branch', exact: true, name: 'Branches', component: Branches},
  {path: '/branch/:id', exact: true, name: 'Branch Details', component: Branch},
  {path: '/branchAdd', exact: true, name: 'Branch Add', component: BranchAdd},
  {path: '/branchDelete/:id', exact: true, name: 'Branch Delete', component: BranchDelete},
  {path: '/branchUpdate', exact: true, name: 'Branch Update', component: BranchUpdate},

  {path: '/login', exact: true, name: 'login', component: login},

  // -------------박수민
  {path: '/Attendance', exact: true, name: 'Attendance', component: Attendance},
  {path: '/Attendance/:no', exact: true, name: 'Attendance Update', component: attUpdate},

  {path: '/Calendar_admin', exact: true, name: 'Calendar', component: Calendar},
  {path: '/Calendar', exact: true, name: 'Calendar', component: Calendar2},
  {path: '/logintest/:log/:no/:name/:dep/:branch', exact: true, name: 'sessionLog', component: sessionLog},
  {path: '/logintest/:log/', exact: true, name: 'sessionLog', component: sessionLog},
  {path: '/Attendance_user', exact: true, name: 'Attendance', component: Attendance_user},
  {path: '/vacation', exact: true, name: 'vacation', component: vacation},
  {path: '/vacation_user', exact: true, name: 'vacation', component: vacation_user},
  {path: '/payment', exact: true, name: 'payment', component: payment},
  {path: '/payment/:no', exact: true, name: 'payment', component: paymentget},
  {path: '/test', exact: true, name: 'payment', component: test},
  {path: '/vacation_apply', exact: true, name: 'vacationApply', component: vacationApply},
  {path: '/adpayment', exact: true, name: 'adpayment', component: adpayment},
  {path: '/adpaymentget/:no', exact: true, name: 'adpayment', component: adpaymentget},
  // -------------박수민

  //start Employee
  {path: '/employee', exact: true, name: 'Employee', component: Employee},
  {path: '/saveEmployee', exact: true, name: 'SaveEmployee', component: SaveEmployee},
  {path: '/standByAuth', exact: true, name: 'StandByAuth', component: StandByAuth}
  //end Employee
];

export default routes;

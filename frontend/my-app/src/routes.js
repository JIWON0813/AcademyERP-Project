import React from 'react';

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
const Dashboard = React.lazy(() => import('./views/Template/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Template/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Template/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/Template/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/Template/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/Template/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/Template/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/Template/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/Template/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/Template/widgets/Widgets'));
const Students = React.lazy(() => import('./views/Student/Students'));
const Student = React.lazy(() => import('./views/Student/Student'));
const Ins_stu = React.lazy(() => import('./views/Student/Ins_stu'));
const Edit_stu = React.lazy(() => import('./views/Student/Edit_stu'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Lectures = React.lazy(() => import('./views/lecture/Lectures'));
const Lecture = React.lazy(() => import('./views/lecture/Lecture'));
const LectureAdd = React.lazy(() => import('./views/lecture/LectureAdd'));
const LectureDelete = React.lazy(() => import('./views/lecture/LectureDelete'));
const LectureUpdate = React.lazy(() => import('./views/lecture/LectureUpdate'));

const Score = React.lazy(() => import('./views/score/Score'));

const Consults = React.lazy(() => import('./views/consult/Consults'));
const Consult = React.lazy(() => import('./views/consult/Consult'));
const ConsultInsert = React.lazy(() => import('./views/consult/ConsultInsert'));
const ConsultDelete = React.lazy(() => import('./views/consult/ConsultDelete'));
const ConsultUpdate = React.lazy(() => import('./views/consult/ConsultUpdate'));

const Branches = React.lazy(() => import('./views/branch/Branches'));
const Branch = React.lazy(() => import('./views/branch/Branch'));
const BranchAdd = React.lazy(() => import('./views/branch/BranchAdd'));
const BranchDelete = React.lazy(() => import('./views/branch/BranchDelete'));
const BranchUpdate = React.lazy(() => import('./views/branch/BranchUpdate'));
// ------------박수민
const Attendance = React.lazy(() => import('./views/Attendance/index'));
const attUpdate = React.lazy(() => import('./views/Attendance/AttUpdate'));
const sessionLog = React.lazy(() => import('./views/users/sessionLog'));
// -------------박수민
const  Employee = React.lazy(() => import('./views/employee/Employee'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },

  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/students', exact: true,  name: 'Students', component: Students },
  { path: '/student', exact: true,  name: 'Students', component: Student },
  { path: '/ins_stu', exact: true,  name: 'Ins_stu', component: Ins_stu },
  { path: '/edit_stu', exact: true,  name: 'Edit_stu', component: Edit_stu },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/lecture', exact: true,  name: 'Lectures', component: Lectures },
  { path: '/lecture/:id', exact: true, name: 'Lecture Details', component: Lecture },
  { path: '/lectureAdd', exact: true, name: 'Lecture Add', component: LectureAdd },
  { path: '/lectureDelete/:id', exact: true, name: 'Lecture Delete', component: LectureDelete },
  { path: '/lectureUpdate', exact: true, name: 'Lecture Update', component: LectureUpdate },

  { path: '/score', exact: true,  name: 'Score', component: Score },

  { path: '/consult', exact: true,  name: 'Consults', component: Consults },
  { path: '/consult/:id', exact: true,  name: 'Consult Details', component: Consult },
  { path: '/consultInsert', exact: true,  name: 'Consult Insert', component: ConsultInsert },
  { path: '/consultDelete/:id', exact: true,  name: 'Consult Delete', component: ConsultDelete },
  { path: '/consultUpdate', exact: true,  name: 'Consult Update', component: ConsultUpdate },

  { path: '/branch', exact: true,  name: 'Branches', component: Branches },
  { path: '/branch/:id', exact: true, name: 'Branch Details', component: Branch },
  { path: '/branchAdd', exact: true, name: 'Branch Add', component: BranchAdd },
  { path: '/branchDelete/:id', exact: true, name: 'Branch Delete', component: BranchDelete },
  { path: '/branchUpdate', exact: true, name: 'Branch Update', component: BranchUpdate },

  // -------------박수민
  { path: '/Attendance', exact: true, name: 'Attendance', component: Attendance },
  { path: '/Attendance/:no', exact: true, name: 'Attendance Update', component: attUpdate },

  { path: '/logintest/:log/:no/:name/:dep', exact: true, name: 'sessionLog', component: sessionLog },
  { path: '/logintest/:log/', exact: true, name: 'sessionLog', component: sessionLog },
  // -------------박수민

  { path: '/employee', exact: true, name : 'Employee', component : Employee}
];

export default routes;

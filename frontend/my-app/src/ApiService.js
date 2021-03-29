import axios from 'axios';
import CounselingDelete from './views/counseling/CounselingDelete';

const USER_API_BASE_URL = "http://localhost:8080/api";
const USER_BASE_URL = "http://localhost:8080";

class ApiService {

  Students(currentPage, Size) {
    return axios.get(USER_API_BASE_URL + '/students' + "?page=" + currentPage + "&size=" + Size);
  }

  Student(no) {
    console.log("!!!!!!!!!!!!!!!!!" + no);
    return axios.get(USER_API_BASE_URL + '/student/' + no);
  }

  addStudent(student) {
    return axios.post(USER_API_BASE_URL + '/ins_stu', student);
  }

  deleteStudent(no) {
    return axios.delete(USER_API_BASE_URL + '/' + no);
  }

  editStudent(student) {
    return axios.post(USER_API_BASE_URL + '/edit_stu/' + student.no, student);
  }

  getEmployee(pageable, verify) {
    return axios.get(USER_API_BASE_URL +
      '/employee', pageable, verify);
  }

  InsertEmployee(employee) {
    return axios.post(USER_API_BASE_URL +
      '/employee', employee);
  }

  standByAuth() {
    return axios.get(USER_API_BASE_URL +
      '/standByAuth');
  }

  StuAtt(name) {
    return axios.get(USER_API_BASE_URL + '/stu_att/' + name);
  }

  Leclist() {
    return axios.get(USER_API_BASE_URL + '/stu_att');
  }

  InsAtt(lec) {
    console.log("?????" + lec);
    return axios.get(USER_API_BASE_URL + '/ins_att/' + lec);
  }

  Salary(currentPage, Size) {
    return axios.get(USER_API_BASE_URL + '/salary' + "?page=" + currentPage + "&size=" + Size);
  }

  SalaryEmp(no) {
    console.log("??????????" + no);
    return axios.get(USER_API_BASE_URL + '/sal_edit/' + no);
  }

  Teacher(no) {
    return axios.get(USER_API_BASE_URL + '/lec_time/' + no);
  }

  EditSalary(employee) {
    console.log("??????????" + employee.salary);
    return axios.post(USER_API_BASE_URL + '/sal_edit_com/' + employee.name, employee);
  }

  Branch() {
    return axios.get(USER_API_BASE_URL + '/lecture/branches');
  }

  SearchStudent(searchKey) {

    return axios.get(USER_API_BASE_URL + '/searchStudent/' + searchKey);
  }

  SearchSalary(searchKey) {
    return axios.get(USER_API_BASE_URL + '/searchSalary/' + searchKey);
  }

  getLecture(no) {
    return axios.get(USER_API_BASE_URL + '/getLecture/' + no);
  }

  addCurriculum(curri) {
    console.log(curri.curriculum)
    return axios.post(USER_API_BASE_URL + '/ins_curri', curri);
  }

  getCurriculum(lecture) {
    return axios.get(USER_API_BASE_URL + '/getcurri/' + lecture);
  }

  ////여진

  getLectures(branch, condition, searchKeyword, currentPageNo, recordsPerPage) {
    return axios.get(USER_BASE_URL +
      "/lecture?branch=" + branch +
      "&condition=" + condition +
      "&keyword=" + searchKeyword +
      "&currentPageNo=" + currentPageNo +
      "&recordsPerPage=" + recordsPerPage)
  }

  getBranches() {
    return axios.get(USER_BASE_URL + "/lecture/branches");
  }

  getSelect(branch) {
    return axios.get(USER_BASE_URL + "/lecture/select?branch=" + branch);
  }

  getTeacher(teacher) {
    return axios.get(USER_BASE_URL + "/lecture/teacher/" + teacher);
  }

  getExamTeacher(teacher) {
    return axios.get(USER_BASE_URL + "/teacher/" + teacher);
  }

  getStudentByLecture(lecture) {
    return axios.get(USER_API_BASE_URL + "/students/" + lecture);
  }

  getCounselingList(student, lecture) {
    return axios.get(USER_BASE_URL + "/counseling?student=" + student + "&lecture=" + lecture);
  }

  getExam(lecture) {
    return axios.get(USER_BASE_URL + "/exam?lecture=" + lecture);
  }

  getPayUser(id) {
    return axios.get(USER_API_BASE_URL + "/students/user/" + id);
  }

  getPay(id) {
    return axios.get(USER_BASE_URL + "/payments/pay/" + id);
  }

  PayCansel(data) {
    return axios.post(USER_BASE_URL + '/payments/cancel', data);
  }
  postPay(pay) {
    return axios.post(USER_BASE_URL + '/payments/pay', pay);
  }

  search(searchKeyword) {
    return axios.get(USER_API_BASE_URL + "/students/user?name=" + searchKeyword);
  }

  getScore(id, lecture, exam) {
    return axios.get(USER_BASE_URL + "/score?student=" + id + "&lecture=" + lecture + "&exam=" + exam);
  }

  scoreTotal(id,lecture) {
    return axios.get(USER_BASE_URL + "/score-total?student=" + id+ "&lecture=" + lecture);
  }

  getStatement(user){
    return axios.get(USER_BASE_URL +"/statement?user="+user)
  }


  //여진 공통
  Insert(url, data) {
    return axios.post(USER_API_BASE_URL + "/" + url, data);
  }

  deleteById(url, id) {
    return axios.delete(USER_BASE_URL + "/" + url + "/" + id);
  }

  updateById(url, id, data) {
    return axios.put(USER_API_BASE_URL + "/" + url + "/" + id, data);
  }

  getURLById(url, id) {
    return axios.get(USER_BASE_URL + "/" + url + "/" + id);
  }

/////////////////////


//수민
  getAttdance(startPage, cntPage, day, name, dep ) {
    return axios({
      method:'get',
      url:encodeURI(USER_API_BASE_URL+'/'+startPage+'/'+cntPage+'?day='+day+'&name='+name+'&dep='+dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    })
  }

  today(no){
    return axios.get(USER_API_BASE_URL+'/today?no='+no)
  }

  in(no){
    return axios.post(USER_API_BASE_URL+'/in',{no: no})
  }

  out(no){
    return axios.get(USER_API_BASE_URL+`/out?no=${no}`)
  }

  night(no){
    return axios.get(USER_API_BASE_URL+`/night?no=${no}`)
  }

  attfind(startPage, cntPage, day, name, dep){
    return axios({
      method:'get',
      url:encodeURI(USER_API_BASE_URL+'/attfind/'+startPage+'/'+cntPage+'?day='+day+'&name='+name+'&dep='+dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    })
  }

  attfind2(start, end, name, dep){
    return axios({
      method:'get',
      url:encodeURI(USER_API_BASE_URL+'/attfind3?start='+start+'&end='+end+'&name='+name+'&dep='+dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    })
  }

  attWeek(year){
    return axios({
      method:'get',
      url:encodeURI(USER_API_BASE_URL+'/attCyear?year='+year),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    })
  }

  att(start, cnt){
    return axios.get(USER_API_BASE_URL+"/att/"+start+"/"+cnt)
  }

  attdep(){
    return axios.get(USER_API_BASE_URL+"/depart")
  }

  attGet(no){
    return axios.get(USER_BASE_URL+"/Attget?no="+no)
  }

  attDelete(no){
    return axios.delete(USER_BASE_URL+`/Attupdate/`+no)
  }

  attUpdate(no, data){
    return axios.put(USER_BASE_URL+`/Attupdate/`+no,data)
  }

  getCalendar(){
    return axios.get("USER_BASE_URL+`/Calendar")
  }

  postCalendar(data){
    return axios({
      url: USER_BASE_URL+'/Calendar',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: data
    })
  }

  deleteCalendar(data){
    return axios({
      url: USER_BASE_URL+'Calendar/'+this.state.no,
      method: "DELETE",
      headers: {'content-type': 'application/json'},
      data: data
    })
  }

  putCalendar(data){
    return axios({
      url: USER_BASE_URL+'/Calendars',
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: data
    })
  }

  getPayment(no){
    return axios.get(USER_BASE_URL+"/payment/" + no)
  }

  getAdPatment(){
    return axios.get(USER_BASE_URL+"/adpayment")
  }

  signUpload(file,config){
    return axios.post(USER_BASE_URL+`/upload`, file, config);
  }

  getUserPayment(no, session_no){
    return axios.get(USER_BASE_URL+"/payment/" + no+"/"+session_no)
  }

  paymentApproved(params){
    return axios.post(USER_BASE_URL+`/payment/approved`,params)
  }

  getDepPayment(){
    return axios.get(USER_BASE_URL+"/paymentUsers")
  }

  insertPayment(data){
    return axios({
      url: USER_BASE_URL+'/payment',
      method: "POST",
      headers: { 'content-type': 'application/json' },
      data: data
    })
  }

  getUserPaymentPage(id){
    return axios.get(USER_BASE_URL+"/payment/1/10/"+id)
  }

  postMasage(data){
    return axios.post(USER_BASE_URL+"/masage/",data)
  }

  getMasage(id){
    return axios.get(USER_BASE_URL+"/masage/"+id)
  }

  clickMasage(no,session_no){
    return axios.put(USER_BASE_URL+"/masage/"+no+"/"+session_no)
  }
//수민

//인아
getConsults(Keyword) {
  return axios.get(USER_BASE_URL +"&keyword=" + Keyword)
}

getConsult(id){
  return axios.get(USER_BASE_URL+'/consultdetail?id='+id)
}

insertConsult(url, data) {
  return axios.post(USER_BASE_URL + "/" + url, data);
}

getConsults() {
  return axios.get(USER_BASE_URL + "/cost");
}

getCostDetail(id){
  return axios.get(USER_BASE_URL+'/costdetail?id='+id)
}

deleteCost(no){
  return axios.delete(USER_BASE_URL+`/cost/`+no)
}

insertCost(url, data) {
  return axios.post(USER_BASE_URL + "/" + url, data);
}

getReceive() {
  return axios.get(USER_BASE_URL + "/receive");
}

getReceive(id){
  return axios.get(USER_BASE_URL+'/receivedetail?id='+id)
}

deleteReceive(no){
  return axios.deleteReceive(USER_BASE_URL+`/receive/`+no)
}

getRecBra() {
  return axios.get(USER_BASE_URL + "/receive/branches");
}

insertReceive(url, data) {
  return axios.post(USER_BASE_URL + "/" + url, data);
}

getNotice(id){
  return axios.get(USER_BASE_URL+'/noticedetail?id='+id)
}

deleteNotice(no){
  return axios.deleteNotiec(USER_BASE_URL+`/notice/`+no)
}

getNotices() {
  return axios.get(USER_BASE_URL + "/notice");
}

insertNotice(url, data) {
  return axios.post(USER_BASE_URL + "/" + url, data);
}

//인아

}


export default new ApiService();

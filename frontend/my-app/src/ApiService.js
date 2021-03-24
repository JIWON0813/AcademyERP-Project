import axios from 'axios';
import CounselingDelete from './views/counseling/CounselingDelete';

const USER_API_BASE_URL = "http://localhost/api";
const USER_BASE_URL = "http://localhost";

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


}


export default new ApiService();

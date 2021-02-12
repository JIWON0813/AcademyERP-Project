import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api";

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

  //Employee method
  getEmployee(state) {
    return axios.get(USER_API_BASE_URL +
      '/employee?size=' + state.size +
      '&page=' + (state.setCurrentPage - 1) +
      '&verify=' + state.verify);
  }

  InsertEmployee(employee) {
    return axios.post(USER_API_BASE_URL +
      '/employee', employee);
  }

  deleteEmployee(no) {
    return axios.delete(USER_API_BASE_URL +
      '/employee', no);
  }

  getEmployeeById(id) {
    return axios.get(USER_API_BASE_URL +
      '/employee/'+id);
  }

  standByAuth() {
    return axios.get(USER_API_BASE_URL +
      '/standByAuth');
  }

  PermitEmployee(employee) {
    return axios.put(USER_API_BASE_URL +
      '/permitEmployee', employee);
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

  Salary() {
    return axios.get(USER_API_BASE_URL + '/salary');
  }

  SalaryEmp(no) {
    return axios.get(USER_API_BASE_URL + '/salary_emp/' + no);
  }

  Teacher(no) {
    return axios.get(USER_API_BASE_URL + '/lec_time/' + no);
  }


}

export default new ApiService();

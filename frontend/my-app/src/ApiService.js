import axios from 'axios';
import CounselingDelete from './views/counseling/CounselingDelete';

const USER_API_BASE_URL = "http://localhost:8080/api";

class ApiService {

  Students(currentPage,Size) {
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

  getEmployee(state) {
    return axios.get(USER_API_BASE_URL +
      '/employee?size=' + state.size +
      '&page=' + (state.setCurrentPage - 1));
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

    Salary(currentPage,Size) {
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
      return axios.get("http://localhost:8080/lecture/branches");
    }

    SearchStudent(searchKey) {
      
      return axios.get(USER_API_BASE_URL + '/searchStudent/' +searchKey);
    }

    SearchSalary(searchKey) {
      return axios.get(USER_API_BASE_URL + '/searchSalary/' + searchKey);
    }

    getLecture(no) {
      return axios.get("http://localhost:8080" + '/getLecture/' + no);
    }

    addCurriculum(curri) {
      console.log(curri.curriculum)
      return axios.post(USER_API_BASE_URL + '/ins_curri', curri);
    }

    getCurriculum(lecture) {
      return axios.get(USER_API_BASE_URL + '/getcurri/' + lecture);
    }

}

export default new ApiService();

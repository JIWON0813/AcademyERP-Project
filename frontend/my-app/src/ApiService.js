import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api";

class ApiService {

    Students(currentPage,Size) {
        return axios.get(USER_API_BASE_URL + '/students' + "?page=" + currentPage + "&size=" + Size);
    }

    Student(no) {
        console.log("!!!!!!!!!!!!!!!!!" + no);
        return axios.get(USER_API_BASE_URL + '/student/' + no);
    }

    addStudent(student){
        return axios.post(USER_API_BASE_URL + '/ins_stu', student);
    }

    deleteStudent(no) {
        return axios.delete(USER_API_BASE_URL + '/' + no);
    }

    editStudent(student) {
        return axios.post(USER_API_BASE_URL + '/edit_stu/' + student.no, student);
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

}

export default new ApiService();
import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api";

class ApiService {

    Students() {
        return axios.get(USER_API_BASE_URL + '/students');
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

}

export default new ApiService();
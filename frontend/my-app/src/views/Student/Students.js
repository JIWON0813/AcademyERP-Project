import React,{ Component,useState } from "react";
import './table.css';
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";
import { DocsLink } from 'src/reusable';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CPagination
  } from '@coreui/react'

class Students extends Component {

    constructor(props) {
        super(props)
        this.state = {
            StudentList: "",
            currentPage: 0,
            Size : 5,
            totalPages : 4,
        }
    }

    componentDidMount() {
        this.getApi(this.state.cuurentPage);
    }

    getApi = (currentPage) => {
        // currentPage -= 1;
        ApiService.Students(currentPage,this.state.Size)
            .then(res => {
                console.log(res);
                this.setState({
                    StudentList : res.data.content,
                    totalPages : res.data.totalPages,
                    totalElements : res.data.totalElements,
                    currentPage: res.data.number
                })
            })
            .catch(res => console.log(res))
            
    }

    selStu = (NO) => {
        window.localStorage.setItem("StudentNO", NO);
        this.props.history.push('/student');
    }
    
    render() {
        const { StudentList,totalPages,currentPage,setCurrentPage } =  this.state;
        // const { setCurrentPage } = useState;
        // const { currentPage } = this.state;
        // const { totalPages } = this.state;
        
        return (
            <div>
            <table>
            <tr><td>no</td><td>name</td><td>hp</td><td>email</td><td>birth</td><td>address</td><td>lecture</td><td>gender</td><td>regdate</td><td></td></tr>
                {StudentList&&StudentList.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.hp}</td>
                    <td>{itemdata.email}</td>
                    <td>{itemdata.birth}</td>
                    <td>{itemdata.address}</td>
                    <td>{itemdata.lecture}</td>
                    <td>{itemdata.gender}</td>
                    <td>{itemdata.regdate}</td>
                    <td width ="80"><CButton block color="secondary" onClick={() => this.selStu(itemdata.no)}>상세</CButton></td>
                    </tr>
                    );
                })}
            <tr><td>
                <Link to={"/ins_stu"}>학생등록하기</Link>
                </td></tr>
                <tr><td>
                    <CCard>
                    <CCardHeader>
                    Pagination
                    <DocsLink name="CPagination"/>
                    </CCardHeader>
                        <CCardBody>
                        <CPagination
                        activePage={currentPage}
                        pages= {totalPages}
                        onActivePageChange={setCurrentPage}/>
                    </CCardBody>
             </CCard>
            </td></tr>
            </table>
            </div>
        )
    }

    // Paginations = () => {
    //     const [currentPage, setCurrentPage] = useState(2)
    //     return (
    //   <>
    //     <CCard>
    //       <CCardBody>
    //         <h6>Default</h6>
    //         <CPagination
    //           activePage={0}
    //           pages={5}
    //           onActivePageChange={setCurrentPage}
    //         />
    //         <br></br>
    //         </CCardBody>
    //         </CCard>
    //     </>
    //     )
    // }
}

export default Students;

import React,{ useEffect,useState } from "react";
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


let currentPages =1;
const StudentData = () => {
    const [inputs, setInputs] = useState({
        StudentList:[],
        totalPages :""
    });

    useEffect(() => {
        getApi(1);
    },[]);
    
    const {StudentList,totalPages} = inputs;
    

    const getApi =(currentPages) => {
        currentPages = currentPages -1
        let size = 5;
        ApiService.Students(currentPages,size)
            .then(res => {
                console.log(res);
                setInputs({
                    StudentList : res.data.content,
                    totalPages : res.data.totalPages
                })
            })
            .catch(res => console.log(res))
    }

    const Paginations = (e) => {
        const [currentPage, setCurrentPage] = useState(currentPages);
        console.log(currentPage)
        console.log(currentPages)
        console.log(currentPages != currentPage)
            if(currentPages != currentPage){
            currentPages = currentPage;
            getApi(currentPages)
            }else{
                console.log(currentPages == currentPage)
            }
            
        return(
        <>
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
        </>
        )
    }

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
                <td width ="80"><Link to={`/student/${itemdata.no}`}> 상세정보 </Link></td>
                </tr>
                );
            })}
        <tr><td>
            <Link to={"/ins_stu"}>학생등록하기</Link>
            </td></tr>
            <tr><td><>
                <Paginations/>
                </>
         </td></tr>
        </table>
            
        </div>
    )

}
    
//     Paginations = () => {
//         const [currentPage, setCurrentPage] = useState(1);
//         const {totalPages} = this.state;
//         console.log(currentPage)
//         console.log(this.state.currentPages)
//         console.log(this.state.currentPages != currentPage)
//             if(this.state.currentPages != currentPage){
//             this.state.currentPages = currentPage;
//             this.getApi(this.state.currentPages)
//             }else{
//                 console.log(this.state.currentPages == currentPage)
//             }
          
//         return(
//         <>
//             <CCard>
//                     <CCardHeader>
//                     Pagination
//                     <DocsLink name="CPagination"/>
//                     </CCardHeader>
//                         <CCardBody>
//                         <CPagination
//                         activePage={currentPage}
//                         pages= {totalPages}
//                         onActivePageChange={setCurrentPage}/>
//                     </CCardBody>
//              </CCard>
//         </>
//         )
//  }

export default StudentData;

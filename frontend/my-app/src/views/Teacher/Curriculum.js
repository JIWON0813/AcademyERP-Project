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
    CPagination,
    CForm,
    CSelect,
    CInput
  } from '@coreui/react'


let currentPages =1;
const CurriculumData = () => {
    const [inputs, setInputs] = useState({
        CurriculumList:[],
        totalPages :""
    });

    useEffect(() => {
        getStudent(1);
    },[]);


    const {CurriculumList,totalPages} = inputs;

    const getStudent =(currentPages) => {
        currentPages = currentPages -1
        let size = 5;
        ApiService.getCurriculum(currentPages,size)
            .then(res => {
                console.log(res);
                setInputs({
                    CurriculumList : res.data.content,
                    totalPages : res.data.totalPages
                })
            })
            .catch(res => console.log(res))
    }

    const Paginations = (e) => {
        const [currentPage, setCurrentPage] = useState(currentPages);
            if(currentPages != currentPage){
            currentPages = currentPage;
            getStudent(currentPages)
            }else{

            }
        return(
        <>
            <CCard>
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
        <tr><td>no</td><td>lecture</td><td>start</td><td>end</td><td>curriculum</td><td>detail</td></tr>
            {CurriculumList&&CurriculumList.map((itemdata, insertIndex) => {
                return (
                <tr>
                <td>{itemdata.no}</td>
                <td>{itemdata.lecture}</td>
                <td>{itemdata.start_date}</td>
                <td>{itemdata.end_date}</td>
                <td>{itemdata.curriculum}</td>
                <td>{itemdata.detail}</td>
                </tr>
                );
            })}
            <tr><td><>
                <Paginations />
                </>
         </td></tr>
        </table>
            
        </div>
    )

}

export default CurriculumData;

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
const StudentData = () => {
    const [inputs, setInputs] = useState({
        StudentList:[],
        // BranchList:[],
        // findBranch:'',
        searchType:"",
        searchKey:"",
        totalPages :""
    });

    useEffect(() => {
        //getbranch();
        getStudent(1);
    },[]);



    const {StudentList,totalPages,BranchList,findBranch,searchType,searchKey} = inputs;
    
    // const getbranch =() => {
    //     ApiService.Branch()
    //         .then(res => {
    //             console.log(res);
    //             setInputs({
    //                 BranchList:res.data.list
    //             })
    //             console.log("123123" + BranchList.no)
    //         })
    //         .catch(res => console.log(res))
    // }

    const getStudent =(currentPages) => {
        
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

    const getSearch = () => {
        console.log(searchKey)
        ApiService.SearchStudent(searchKey)
        
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

    // const TypeSelect = (e) => {
    //     setInputs({
    //         searchType: e.target.value
    //     })
    //     console.log(searchType)
    //     // getStudent(currentPages);
    //   }

    const KeySelect = (e) => {
        e.preventDefault()
        setInputs({
            searchKey: e.target.value
        })
        console.log(searchKey)
        
        //getStudent(currentPages);
        
      }

    const handleSubmit = (e) => {
        e.preventDefault()
      }

    return (
        <div> 
            <header>
            <CForm inline onSubmit={handleSubmit}>
            {/* <CSelect custom id="branch" onChange={branchSelect} value={findBranch}>
              <option value="">지점</option>
              {BranchList && BranchList.map((itemdata, insertIndex) => {
                return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
              })}
            </CSelect> */}
            {/* <CSelect custom id="search" onChange={TypeSelect} value={searchType}>
              <option value="asd">검색조건</option>
              <option value="lecture">강의명</option>
              <option value="name">이름</option>
            </CSelect> */}
            &nbsp;&nbsp;
            <CInput
              className="mr-sm-2"
              placeholder=""
              size="sm"
              name="searchKeyword"
              placeholder="이름을 입력하세요"
              value={searchKey}
              onChange={KeySelect}
            />
            <CButton onClick={getSearch}>검색</CButton>
          </CForm>
          </header>

        <table>

        <tr><td>no</td><td>name</td><td>hp</td><td>email</td><td>birth</td><td>address</td><td>lecture</td><td>gender</td><td>regdate</td><td></td></tr>
            {StudentList&&StudentList.map((itemdata, insertIndex) => {
                return (
                <tr>
                <td width ="20">{itemdata.no}</td>
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
            <tr><td><>
                <Paginations />
                </>
         </td></tr>
         <tr><td>
            <Link to={"/ins_stu"}>학생등록하기</Link>
            </td></tr>
        </table>
            
        </div>
    )

}

export default StudentData;

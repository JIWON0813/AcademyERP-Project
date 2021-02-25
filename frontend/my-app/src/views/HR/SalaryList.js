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
    CInput 
  } from '@coreui/react'

  let currentPages =1;
  const SalaryCheck = () => {
    const [inputs, setInputs] = useState({
        SalaryList: '',
        searchKey:"",
        totalPages :""
    });

    useEffect(() => {
        getSalary(currentPages);
    },[]);

    const {SalaryList,totalPages,searchKey} = inputs;

    const getSalary = (currentPages) => {
        currentPages = currentPages -1
        let size = 5;
        ApiService.Salary(currentPages,size)
            .then(res => {
                setInputs({
                    SalaryList : res.data.content,
                    totalPages : res.data.totalPages    
                })
            })
            .catch(res => console.log(res))
            
    }

    const getSearch = () => {
        console.log(searchKey)
        ApiService.SearchSalary(searchKey)
        .then(res => {
            console.log(res);
            setInputs({
                SalaryList : res.data.content,
                totalPages : res.data.totalPages
            })
        }).catch(res => console.log(res))
    }

    const KeySelect = (e) => {
        e.preventDefault()
        setInputs({
            searchKey: e.target.value
        })
        console.log(searchKey)
        
        //getStudent(currentPages);
        
      }

    const Paginations = (e) => {
        const [currentPage, setCurrentPage] = useState(currentPages);
            if(currentPages != currentPage){
            currentPages = currentPage;
            getSalary(currentPages)
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
                <header>
            <CForm inline>
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
            <tr><td width ="50">no</td><td>branch</td><td>name</td><td>salary</td></tr>
                {SalaryList&&SalaryList.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.branch}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.salary}</td>
                    <td width ="80"><Link to={`/sal_edit/${itemdata.no}`}>급여수정</Link></td>
                    </tr>
                    );
                })}
                <tr><td><>
                <Paginations />
                </>
         </td><td></td><td></td></tr>
            </table>
            </div>
        )
    }

    export default SalaryCheck  

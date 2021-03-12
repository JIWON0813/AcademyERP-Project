import React,{ useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import './table.css';
import ApiService from "../../ApiService";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

  const InsertCurriculum =({ match }) => {
    const [inputs, setInputs] = useState({
        lectureList : [],
        lecture:"",
        start_date:"",
        end_date:"",
        curriculum:"",
        detail:"",
        no:match.params.no

    });

    useEffect(() => {
        getLecture();
    },[]);

    const {lecture,lectureList,start_date,end_date,curriculum,detail,no} = inputs;

    const getLecture = () => {
        ApiService.getLecture(match.params.no)
            .then(res => {
                setInputs({
                    lectureList : res.data.list
                })
                console.log(match.params.no)
            })
        .catch(err =>{
            console.log('getApi() 에러', err);
        });
    }

    let history = useHistory();

    const saveCurriculum = (e) => {
        e.preventDefault();
        let curri= {
          lecture : lecture,
          start_date :start_date,
          end_date :end_date,
          curriculum : curriculum,
          detail : detail,  
        }
        ApiService.addCurriculum(curri)
          .then(res => {
            alert("저장되었습니다.")
            history.push('/teacher');
          })
          .catch(err => {
            console.log('saveCurriculum() 에러', err);
          });
    
      }

    const onChange = (e) => {
      const { value, name } = e.target;
      setInputs({
      ...inputs,
      [name]: value
      });

    }

    return (
        <CCard>
            <CCardBody>
        <CForm>
        <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor="text-input">강의선택</CLabel>
            </CCol>
            <CCol>
                <CSelect custom id="lecture" name="lecture" value={lecture} onChange={onChange}>
                    <option value="">강의</option>
                    {lectureList&& lectureList.map((itemdata, insertIndex) => {
                        return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                </CSelect>
            </CCol>
            </CFormGroup>
            <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">시작일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" name="start_date" placeholder="시작일" value={start_date} onChange={onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">종료일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" name="end_date" placeholder="종료일" value={end_date} onChange={onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">교육과정</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="curriculum" placeholder="교육과정" value={curriculum} onChange={onChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">교육과정상세</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="detail"
                      id="textarea-input"
                      rows="9"
                      placeholder="교육과정상세"
                      value={detail}
                      onChange={onChange}
                    />
                  </CCol>
                </CFormGroup>
        </CForm>
        </CCardBody>
            <CCardFooter>
            <CButton onClick={saveCurriculum} size="sm" color="primary"><CIcon name="cil-scrubber" /> 저장 </CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> 초기화 </CButton>
            </CCardFooter>
        </CCard>
    );
  }
export default InsertCurriculum;

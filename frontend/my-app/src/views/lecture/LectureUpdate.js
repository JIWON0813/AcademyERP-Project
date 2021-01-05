import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import {CCol, CFormGroup, CInput, CInputCheckbox, CLabel, CSelect} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilAlarm} from "@coreui/icons/js/free/cil-alarm";

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

class LectureUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      branchList: "",
      teacherList: "",
      roomList: "",
      partList:"",
      name: this.props.ItemList.name,
      teacher: this.props.ItemList.teacher,
      price: this.props.ItemList.price,
      students: this.props.ItemList.students,
      room: this.props.ItemList.room,
      start_date: this.props.ItemList.start_date,
      end_date: this.props.ItemList.end_date,
      day: this.props.ItemList.day.split(','),
      start_time: this.props.ItemList.start_time,
      end_time: this.props.ItemList.end_time,
      part: this.props.ItemList.part,
      branch: this.props.ItemList.branch
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateLecture = this.updateLecture.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.branchSelect = this.branchSelect.bind(this);
    this.teacherSelect = this.teacherSelect.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);

  }
  componentDidMount() {
    this.getApi();

  }

  getApi = () => {
    axios.get("http://localhost:8080/lecture/branches")
      .then(res => {
        this.setState({
          branchList: res.data.list
        })
      })
      .catch(res => console.log(res))

    axios.get("http://localhost:8080/lecture/select?branch=" + this.state.branch)
      .then(res => {
        this.setState({
          teacherList: res.data.teacherList,
          roomList: res.data.roomList,
          partList: res.data.partList
        })
      })
      .catch(res => console.log(res))
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.updateLecture()
    this.setState({
      name: '',
      teacher: '',
      price: '',
      students: '',
      room: '',
      start_date: '',
      end_date: '',
      day: '',
      start_time: '',
      end_time: '',
      part: '',
      branch: ''
    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
    /*this.props.history.push('/lecture')*/
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateLecture() {
    axios({
      url: 'http://localhost:8080/lecture/' + this.props.ItemList.no,
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        teacher: this.state.teacher,
        price: this.state.price,
        students: this.state.students,
        room: this.state.room,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        day: this.state.day.toString(),
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        part: this.state.part,
        branch: this.state.branch
      }
    })
      .then(function (response){
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      })
  }
  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {

    this.setState({
      open: false
    })
  }

  branchSelect = (e) => {
    this.setState({
      branch: e.target.value
    })
    axios.get("http://localhost:8080/lecture/select?branch=" + this.state.branch)
      .then(res => {
        this.setState({
          teacherList: res.data.teacherList,
          roomList: res.data.roomList,
          partList: res.data.partList
        })
      })
      .catch(res => console.log(res))
  }

  teacherSelect = (e) => {
    this.setState({
      teacher: e.target.value
    })
  }
  roomSelect = (e) => {
    this.setState({
      room: e.target.value
    })
  }
  partSelect = (e) => {
    this.setState({
      part: e.target.value
    })
  }
  checkboxChange = (e) => {
    const day=this.state.day
    let index
    if (e.target.checked) {
      day.push(e.target.value)
    } else {
      index = day.indexOf(e.target.value)
      day.splice(index, 1)
    }
    this.setState({day:day})
  }

  render() {
    let ItemList = this.props.ItemList;
    let day = this.state.day;
    const {branchList} = this.state;
    const {teacherList} = this.state;
    const {roomList} = this.state;
    const {partList} = this.state;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          수정
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>클래스 수정</DialogTitle>
          <DialogContent>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="branch">지점</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CSelect custom id="branch" onChange={this.branchSelect} defaultValue={ItemList.branch}>
                    <option value="">지점</option>
                    {branchList && branchList.map((itemdata, insertIndex) => {
                      return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
              </CCol>
                </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="part">분야</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom id="part" onChange={this.partSelect} defaultValue={ItemList.part}>
                  <option value="">분야</option>
                  {partList && partList.map((itemdata, insertIndex) => {
                    return (<option
                      value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                  })}
                </CSelect>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="name">강의명</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="name" placeholder="강의명" defaultValue={ItemList.name}
                        onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="teacher">강사</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                  <CSelect custom id="teacher" onChange={this.teacherSelect} defaultValue={ItemList.teacher}>
                    <option value="">강사</option>
                    {teacherList && teacherList.map((itemdata, insertIndex) => {
                      return (<option value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect>
              </CCol>
                </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="price">수강료</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="price" placeholder="수강료" defaultValue={ItemList.price}
                        onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="students">정원수</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput name="students" placeholder="정원수" defaultValue={ItemList.students}
                        onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="room">강의실</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                  <CSelect custom id="room" onChange={this.roomSelect} defaultValue={ItemList.room}>
                    <option value="">강의실</option>
                    {roomList && roomList.map((itemdata, insertIndex) => {
                      return (<option
                        value={itemdata.no}>{insertIndex + 1}.&nbsp;{itemdata.name}&nbsp;({itemdata.max_person}명)</option>);
                    })}
                  </CSelect>
              </CCol>
                </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="start_date">개강일</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" id="start_date" name="start_date" placeholder="개강일" defaultValue={ItemList.start_date}
                        onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="end_date">종강일</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" id="end_date" name="end_date" placeholder="종강일" defaultValue={ItemList.end_date}
                        onChange={this.handleValueChange}/>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>요일</CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox1" name="day" value={"월"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("월")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">월</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox2" name="day" value={"화"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("화")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">화</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox3" name="day" value={"수"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("수")}/>

                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">수</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox4" name="day" value={"목"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("목")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox4">목</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox5" name="day" value={"금"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("금")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox5">금</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox6" name="day" value={"토/일"}
                                  onChange={this.checkboxChange}
                                  defaultChecked={day.includes("토/일")}/>
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox6">주말(토/일)</CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="start_time"><CIcon content={cilAlarm} size="2x1"/>&nbsp;&nbsp;수업시간(시작시간 ~ 종료시간)</CLabel>
            </CCol>
            <TextField title="시작시간" type="time" name="start_time" defaultValue={ItemList.start_time}
                       onChange={this.handleValueChange}/> <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <TextField title="종료시간" type="time" name="end_time" defaultValue={ItemList.end_time}
                       onChange={this.handleValueChange}/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>
    )

  }

}


export default withStyles(styles)(LectureUpdate)

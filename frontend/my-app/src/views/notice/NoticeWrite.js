//---------------------------------
// 제목 : 등록 - 공지사항
// 파일명 : NoticeWrite.js
// 작성자 : 최인아
//---------------------------------
import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles, Grid} from "@material-ui/core";
import {CCol, CFormGroup, CInput, CTextarea} from '@coreui/react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
    hidden: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

class NoticeWrite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //employeeList: "",
      section: '',
      title: '',
      content: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.noticeWrite = this.noticeWrite.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    //this.employeeSelect = this.employeeSelect.bind(this);

  }

  // componentDidMount() {
  //   this.getApi();

  // }

  // getApi = () => {
  //   axios.get("http://localhost:8080/notice/employee")
  //     .then(res => {
  //       this.setState({
  //         employeeList: res.data.list
  //       })
  //     })
  //     .catch(res => console.log(res))
  // }

  handleFormSubmit(e) {
    e.preventDefault()
    this.noticeWrite()
    this.setState({
      section: '',
      title: '',
      content: ''
      //emp: ''
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.title] = e.target.value;
    this.setState(nextState);
  }

  handleChange = (event) => {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  noticeWrite() {
    axios({
      url: 'http://localhost:8080/notice',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        section: this.state.section,
        title: this.state.title,
        content: this.state.content
        //emp: this.state.emp
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
      section: '',
      title : '',
      content: '',
      //emp: '',
      open: false
    })
    this.props.stateRefresh();
  }

  // employeeSelect = (e) => {
  //   this.setState({
  //     emp: e.target.value
  //   })
  // }

  render() {
    const { classes } = this.props;
    // const { employeeList} = this.state;
  
    return (
      <div>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>글쓰기</Button>
        </Grid>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true} maxWidth = {'xs'}>
          <DialogTitle>공 지 사 항</DialogTitle>

          <DialogContent>
            <Grid>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">구분</InputLabel>
                <Select
                    native
                    value={this.state.section}
                    onChange={this.handleChange}
                    label="구분"
                    inputProps={{ name: 'section', id: 'outlined-age-native-simple',}}>
                      <option aria-label="None" value="section" />
                      <option value={"안내"}>안내</option>
                      <option value={"공지"}>공지</option>
                      <option value={"결혼"}>결혼</option>
                      <option value={"부고"}>부고</option>
                </Select>
              </FormControl>
              </Grid>
              {/* <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CSelect custom id="emp" onChange={this.employeeSelect} value={this.state.emp}>
                    <option value="">작성자</option>
                    {employeeList && employeeList.map((itemdata, Index) => {
                      return (<option key={Index} value={itemdata.no}>{Index + 1}.&nbsp;{itemdata.name}</option>);
                    })}
                  </CSelect><br/>
                </CFormGroup>
              </CCol>
            </CRow> */}
              <CFormGroup row>
                <CCol xs="12" md="9">
                  <TextField label="제목" type="text" name="title" value={this.state.title} onChange={this.handleChange}/><br/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="content" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="..." 
                      value={this.state.content} onChange={this.handleChange}
                    />
                  </CCol>
                </CFormGroup>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>글등록</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
            </DialogActions>
          </DialogContent>
        
          </Dialog>
      </div>
    )

  }

}


export default withStyles(styles)(NoticeWrite)



//-----------------------
// 제목 : 비용관리-등록
// 파일명 : CostInsert.js
// 작성자 : 최인아
//-----------------------
import React from 'react'
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles, Grid } from "@material-ui/core";
import { CCol, CFormGroup } from '@coreui/react'
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

class CostInsert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      section: '',
      reason: '',
      allcost: '',
      date: '',
      pay: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.costInsert = this.costInsert.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.costInsert()
    this.setState({
      section: '',
      reason: '',
      allcost: '',
      date: '',
      pay: ''
    })
    alert("등록되었습니다.");
    this.props.stateRefresh();
  }

  handleChange = (event) => {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  costInsert() {
    axios({
      url: 'http://localhost:8080/cost',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        section: this.state.section,
        reason: this.state.reason,
        allcost: this.state.allcost,
        date: this.state.date,
        state: this.state.state
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
        reason: '',
        allcost: '',
        date: '',
        state: '',
      open: false
    })
    this.props.stateRefresh();
  }

  render() {
    const { classes } = this.props;
  
    return (
      <div>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>등록</Button>
        </Grid>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true} maxWidth = {'xs'}>
          <DialogTitle>비 용 등 록</DialogTitle> 

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
                      <option value={"식비"}>식비</option>
                      <option value={"차비"}>차비</option>
                </Select>
              </FormControl>
              </Grid>
              <br></br>
              <CFormGroup row>
                <CCol xs="12" md="9">
                <TextField label="총 비용" type="text" name="allcost" value={this.state.allcost} onChange={this.handleChange}/><br/>
                <br></br>
                  사용일
                  <br></br>
                  <TextField type="date" name="date" value={this.state.date} onChange={this.handleChange}/><br/>
                  <TextField label="승인여부" type="text" name="state" value={this.state.state} onChange={this.handleChange}/><br/>
                </CCol>
              </CFormGroup>
              <br></br>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
            </DialogActions>
          </DialogContent>
        
          </Dialog>
      </div>
    )

  }

}


export default withStyles(styles)(CostInsert)



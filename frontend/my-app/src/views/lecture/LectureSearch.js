import React from 'react'
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,} from "@material-ui/core";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CNavbarNav,
  CRow,
  CSelect
} from '@coreui/react'
import CIcon from "@coreui/icons-react";
import {cilAlarm} from "@coreui/icons/js/free/cil-alarm";



class LectureSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: ''
    }
    this.handleValueChange = this.handleValueChange.bind(this)

  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }



  render() {

    return (
      <div>
        <CNavbarNav className="ml-auto">
        <CForm inline>
          <CInput
            className="mr-sm-2"
            placeholder="Search"
            size="sm"
            name="searchKeyword"
            value={this.state.searchKeyword}
            onChange={this.handleValueChange}
          />
          <CButton color="light" className="my-2 my-sm-0" type="submit">Search</CButton>
        </CForm>
        </CNavbarNav>
  </div>
  )

  }

  }


  export default LectureSearch



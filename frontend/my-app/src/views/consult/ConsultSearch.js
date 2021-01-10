import React from 'react'
import {CButton, CForm, CInput, CNavbarNav} from '@coreui/react'


export default class ConsultSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sKeyword: ''
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
            name="sKeyword"
            value={this.state.sKeyword}
            onChange={this.handleValueChange}
          />
          <CButton color="light" className="my-2 my-sm-0" type="submit">검색</CButton>
        </CForm>
        </CNavbarNav>
  </div>
  )

  }

  }






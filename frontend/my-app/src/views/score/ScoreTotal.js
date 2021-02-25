import React from 'react'
import {CInput} from "@coreui/react";
import axios from "axios";

class ScoreTotal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      student :this.props.id,
      lecture :this.props.lecture,
      totalScore:"",
    }
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = () => {
    axios.get("http://localhost:8080/score-total?student="+this.props.id+"&lecture="+this.props.lecture)
      .then(res => {
        this.setState({
          totalScore: res.data.totalScore,
        })
      })
      .catch(res => console.log(res))
  }


  render() {
    return (
      <div>
        <CInput
                type="text"
                id="totalScore"
                name="totalScore"
                defaultValue={this.state.totalScore}
                disabled={true}
        />
      </div>
    )

  }

}
export default ScoreTotal

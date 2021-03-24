import React from 'react'
import {CInput} from "@coreui/react";
import axios from "axios";
import ApiService from "../../ApiService";

class ScoreEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scoreList:"",
      student :this.props.id,
      lecture :this.props.lecture,
      score:"",
      exam:this.props.exam,
      disabled:this.props.disabled,
      no:"",
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.setScoreArray = this.setScoreArray.bind(this);
  }
  componentDidMount() {
    this.getApi();
  }

  getApi = () => {
    ApiService.getScore(this.props.id,this.props.lecture,this.props.exam)
      .then(res => {
        this.setState({
          scoreList : res.data.scoreList,
          no : res.data.scoreList.no,
          score : res.data.scoreList.score,
        })

      })
      .catch(res => console.log(res))
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleNumChange(evt) {
    const score = (evt.target.validity.valid) ? evt.target.value : this.state.score;
    this.setState({ score });
  }

  setScoreArray(){
    const scoreArray=[];
    scoreArray.push({
      student :this.state.student,
      lecture :this.state.lecture,
      score:this.state.score,
      exam:this.state.exam,
      no:this.state.no,
    })
    this.props.setData(scoreArray)
  }

  render() {
    return (
      <div>
            <CInput onBlur={(e) => {
              this.setScoreArray();
            }} name="score"
                    placeholder="점수"
                    pattern="[0-9]*"
                    value={this.state.score}
                    disabled={this.props.disabled}
                    onInput={this.handleNumChange.bind(this)}
                    />
      </div>
    )

  }

}
export default ScoreEdit

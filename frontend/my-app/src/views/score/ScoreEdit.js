import React from 'react'
import {CFormGroup, CInput, CSelect} from "@coreui/react";
import axios from "axios";

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
    axios.get("http://localhost:8080/score?student="+this.props.id+"&lecture="+this.props.lecture+"&exam="+this.props.exam)

      .then(res => {
        this.setState({
          scoreList: res.data.scoreList,
          no:res.data.scoreList.no,
          score:res.data.scoreList.score,
        })

      })
      .catch(res => console.log(res))
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
    console.log("렌더")
    const {scoreList} = this.state;
    let defaultValue;
    if(scoreList === null){
      defaultValue = 0;
    }else{
      defaultValue = scoreList.score;
    }
    return (
      <div>
        <CFormGroup>
            <CInput onBlur={(e) => {
              this.setScoreArray();
            }} name="score" placeholder="점수"  defaultValue={defaultValue} disabled={this.props.disabled}
                    onChange={this.handleValueChange}/>
        </CFormGroup>
      </div>
    )

  }

}
export default ScoreEdit

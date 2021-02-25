// import React from 'react'
// import axios from 'axios';
// import { TextField } from "@material-ui/core";

// class NoticeUpdate extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//         noticeList:""
//     }
//     this.handleFormSubmit = this.handleFormSubmit.bind(this)
//     this.handleValueChange = this.handleValueChange.bind(this)
//     this.updateNotice = this.updateNotice.bind(this)
//     this.handleClickOpen = this.handleClickOpen.bind(this)
//   }


//   handleFormSubmit(e) {
//     e.preventDefault()
//     this.updateNotice()
//     this.setState({
//       //section: '',
//       title: '',
//       content: ''
//     })
//     alert("수정되었습니다.");
//     this.props.stateRefresh();
//   }

//   handleValueChange(e) {
//     let nextState = {};
//     nextState[e.target.title] = e.target.value;
//     this.setState(nextState);
//   }

//   updateNotice() {
//     axios({
//       url: 'http://localhost:8080/notice/edit/' + this.props.noticeList.no,
//       method: "PUT",
//       headers: {'content-type': 'application/json'},
//       data: {
//         section: this.state.section,
//         title: this.state.title,
//         content: this.state.content
//       }
//     })
//       .then(function (response){
//         console.log(response)
//       })
//       .catch(function (error){
//         console.log(error)
//       })
//   }
//   handleClickOpen() {
//     this.setState({
//       open: true
//     });
//   }

//   render() {
//     let noticeList = this.props.noticeList;
//     const { noticeList } = this.state;
//     return (
//       <div>
//           <header>클래스 수정</header>
//           <table>
//             <TextField label="구분" type="text" name="section" defaultValue={noticeList.section} onChange={this.handleValueChange}/><br/>
//             <TextField label="제목" type="text" name="title" defaultValue={noticeList.title} onChange={this.handleValueChange}/><br/>
//             <TextField label="내용" type="text" name="content" defaultValue={noticeList.content} onChange={this.handleValueChange}/><br/>
//           <footer>
//             <button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</button>
//           </footer>
//           </table>
//       </div>
//     )

//   }

// }


// export default NoticeUpdate

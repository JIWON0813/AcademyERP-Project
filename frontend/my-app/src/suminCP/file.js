import React from 'react';
import axios from 'axios';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          selectedFile: null,
        }
      }
    fileChangedHandler = (e) => {
        const file = new FormData();
        file.append( "file",e.target.files[0]);
        file.append( "no",window.sessionStorage.getItem("no"));
        file.append( "path",this.props.path);
        const config = {
            headers: {
            "content-type": "multipart/form-data"
            }
        };
        axios.post(`http://localhost:8080/upload`, file, config);
    };
  
  
   
  
    render() {
      return (
        <div className="App">
          <input type="file"  onChange={this.fileChangedHandler} />
        </div>
      );
    }
  }
  
  export default App;
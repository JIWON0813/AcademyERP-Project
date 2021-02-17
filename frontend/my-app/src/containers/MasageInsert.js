import axios from 'axios';


export function masage(msg){
    axios.post("http://localhost:8080/masageInsert/",{
        employee_no:window.sessionStorage.getItem("no"),
        
    })
        .then(res => {
            console.log("masageInsert")
        })
        .catch(res => console.log(res))
    
    console.log(msg)
}
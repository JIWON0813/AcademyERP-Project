import axios from "axios";



  var  getApi = () => {
        axios.get("http://localhost:8080/api/users")
            .then(res => {
                console.log(res);
                return  res.data.list;
            })
            .catch(res => console.log(res))
        .catch(res => console.log(res))
      }
const usersData =  getApi
export default usersData

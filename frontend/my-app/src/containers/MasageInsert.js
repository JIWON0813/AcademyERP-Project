import axios from 'axios';


//post,title,contents,link
// link="링크" name="이름" time="1111" count="4"
// title="제목" contents="내용"
export function masage(post,title,contents,link){
    axios.post("http://localhost:8080/masage/",{
        to:window.sessionStorage.getItem("no"),
        post: post,
        title: title,
        contents: contents,
        link: link
    })
    .then(res => {
        console.log("masageInsert : "+res)
    })
    .catch(res => console.log(res))
}
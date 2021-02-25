import React from 'react';


const createArr = (n)=>{
  const arr = new Array(n);
  for(var i = 0 ; i < n ; i++){
    arr[i] = i+1;
  }
  return arr;
}

function BoardPage({maxPage, pageLimit}){
  const [blockNum , setBlockNum] = useState(0);
  const [currentPage , setCurrentPage] = useState(1);

  const v = Number (blockNum * pageLimit);
  const arr = createArr(Number(maxPage));
  let pageArr = arr.slice(v, Number(pageLimit) + v);

  const firstPage=()=>{
    setBlockNum(0);
    setCurrentPage(1);
  }

  const lastPage=()=>{
    setBlockNum( Math.ceil(maxPage/pageLimit) - 1)
    setCurrentPage(maxPage);
  }

  const prev=()=>{
    if(currentPage <= 1)
      return ;
    if((currentPage - 1) <= pageLimit * blockNum){
      setBlockNum(n=>n-1);
    }
    setCurrentPage(n=> n - 1);
  }

  const next=()=>{
    if(currentPage >= maxPage)
      return;
    if(pageLimit * Number(blockNum + 1) < Number(currentPage + 1)){
      setBlockNum(n=>n+1);
    }
    setCurrentPage(n => n+1);
  }

  return (
    <Paging>
      <h1></h1>
    </Paging>
  )
}

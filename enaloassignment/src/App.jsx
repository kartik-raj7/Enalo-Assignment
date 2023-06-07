
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { getPosts } from './Redux/Api/getApi'
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const baseurl = 'https://stagingapi.enalo.in/inventory/get-items/?limit=10&offset=';
  const [nexturl,setnexturl] = useState(null);
  const [currentdata,setCurrentdata] = useState({});
  const [pages,setPages] = useState(0);
  const [data,setData] = useState([]);
  const [offset,setoffset] = useState(1);
  useEffect(()=>{
  axios.get(`${baseurl}${(offset-1)*10}`, {
  })
  .then(function (response) {
    console.log(response);
    setData(response);
  })
},[offset])
console.log(data);
useEffect(()=>{
 if(data&&data.data){
  const {count,results} = data.data;
  console.log(results);
  // console.log(`here=${data.data}`);
  setCurrentdata(results);
  setPages(Math.ceil(count/10));
 }
},[data])
  // const dispatch = useDispatch();
  // const data = useSelector(getPosts);
  // console.log(data);
  // useEffect(()=>{
  //    const data={
  //     type:''
  //    }
  //    dispatch()
  // },[])
  function Call(e){
     setoffset(e);
  }
  function Showpages(){
    if(currentdata&&currentdata.length>0){
      return(
        <div>
          <h2>Current Data</h2>
          <table style={{border:'2px solid white',padding:'20px'}}>
          <th>items</th>
          <th>item name</th>
          {currentdata.map((item,index)=>(
            
             <tr key={index} >
              <td key={index} style={{border:'2px solid white',padding:'20px',margin:'20px'}}>
             <div >
               {item.id}
             </div>
             </td>
             <td style={{border:'2px solid white',padding:'20px'}}>
             <div >
               {item.business_name}
             </div>
             </td>
             
             </tr>
             
          ))}
          </table>
        </div>   
    )}
    else{
      return(
        <h2>Nothing to show here</h2>
      )
    }
  }
  const Pagesnumber=()=>{
    var x = pages;
    var arr = [];
    for(var i=1;i<=x;i++){
      arr.push(i);
    }
    // while(x>0){
    //   x--;
    //   console.log('here');
      return(
        <div style={{display:'flex',flexDirection:'row',paddingTop:'40px'}}>
          {arr.map((item,index)=>(
            <div style={{backgroundColor:'blue',margin:'10px',height:'20px',width:'20px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}key={index} onClick={()=>Call(item)}>{item}</div>
          ))
            }
         
         </div>
        
        )     
    // }  
  }
  return (
    <>
      <div>
        <Showpages/>
      </div>
      <div>
       <Pagesnumber/>
      </div>
    </>
  )
}

export default App

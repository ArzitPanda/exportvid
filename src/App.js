import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {Heading,Menu, Skeleton, Spinner, Tooltip} from 'react-ui';
import {FaYoutube,FaFacebook,FaTwitter,FaInstagram,FaDownload} from 'react-icons/fa'
import {BsFillArrowUpCircleFill,BsFillArrowDownCircleFill} from 'react-icons/bs'
import {MdVideocam,MdAudiotrack} from 'react-icons/md'
import axios from 'axios';

function App() {

const [type,setType]=useState(1);
const [sizeNav,setSizeNav]=useState(false)
const [fetched,setfetched]=useState(false);
const[data,setData]= useState(null);
const [Link,setLink]=useState("");

const fetchData =async ()=>{
setfetched(true);
try {
  
  console.log(type)
    const data1= await  axios.post("https://ytarz.herokuapp.com/",{type,Link}) 
    console.log(data1.data);
setData(data1.data);

setLink("");

  } catch (error) {
    console.log(error)
  }

setfetched(false);
if(data)

console.log({...data,name:"this is useStte"})
else
console.log("no data")

}






const option="bg-slate-200  w-10 md:w-36 h-10 px-4 py-2 border-b-2 border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors"

  return (
    <div className="App w-screen  bg-slate-100">
<div className="w-full py-4 bg-violet-800  text-slate-200 text-xl md:text-4xl font-bold text-center">
<Heading size="page" >ExportVid<sub className="text-slate-300 text-sm">by arz</sub></Heading>
</div>
<p className="w-full md:w-7/12 text-sm md:text-xl  py-2 my-6 md:my-24 mx-auto px-4 capitalize text-slate-600 shadow-2xl">download video without any ad</p>

<div className="w-full md:w-8/12 flex flex-col md:flex-row  items-center md:items-start  justify-between md:justify-center  mx-auto ">
<div calssName="w-full flex flex-col items-start justify-center ">
<Tooltip label="Choose ">
<button  className="hidden md:block" onClick={()=>{sizeNav?setSizeNav(false):setSizeNav(true)}}>
  

{type===0 && (<li className={option}><BsFillArrowDownCircleFill size={30} color="black" /></li>)}
{type ===1 && ( <li className={option}><FaYoutube size={30} color="red" /></li>)}
{type ===2 && ( <li className={option}><FaFacebook size={30} color="#4267B2"/></li>)}
{type ===3 && ( <li className={option}><FaTwitter size={30} color="#4267B2"/></li>)}
{type ===4 && ( <li className={option}><FaInstagram size={30} color="#4267B2"/></li>)}



</button>
</Tooltip>
<ul className={` ${sizeNav?`h-50 md:flex opacity-100 items-center justify-center md:flex-col w-full gap-y-1` :`h-50 opacity-0 md:hidden `} transition-opacity flex-row  ml-5 md:ml-0 gap-x-4 flex sm:justify-evenly`}>
 <li className={option} onClick={()=>{setType(1);setSizeNav(false)}}><FaYoutube size={30} color="red" /></li>
 <li className={option} onClick={()=>{setType(2);setSizeNav(false)}}><FaFacebook size={30} color="#4267B2"/></li>
 <li className={option} onClick={()=>{setType(3);setSizeNav(false)}}><FaTwitter size={30} color="#1DA1F2"/></li>
 <li className={option} onClick={()=>{setType(4);setSizeNav(false)}}><FaInstagram size={30} color="black"/></li>
</ul>

</div>
<div className="flex items-center flex-1 flex-row-reverse">
<input type="text" className='border-2 solid border-violet-900 flex-1 h-10 focus:outline-none focus:border-violet-300 bg-violet-100 pl-6' placeholder="paste your url" onChange={(e)=>{setLink(e.target.value)}} value={Link}/>
<button className='block md:hidden' onClick={()=>{sizeNav?setSizeNav(false):setSizeNav(true)}}>
  
{type===0 && (<li className={option}><BsFillArrowUpCircleFill size={30} color="black" /></li>)}
{type ===1 && ( <li className={option}><FaYoutube size={30} color="red" /></li>)}
{type ===2 && ( <li className={option}><FaFacebook size={30} color="#4267B2"/></li>)}
{type ===3 && ( <li className={option}><FaTwitter size={30} color="#4267B2"/></li>)}
{type ===4 && ( <li className={option}><FaInstagram size={30} color="#4267B2"/></li>)}



</button>
</div>
<button className="hidden  md:block w-36 h-10 px-4 py-2 text-white bg-gray-700 rounded-r-lg" onClick={fetchData} >Generate</button>
</div>
<button className="flex items-center justify-evenly flex-1 mx-auto md:hidden  w-5/12 h-10 px-4 py-2 text-sm text-black bg-gray-200  shadow-sm rounded-lg my-10 hover:bg-gray-300"  onClick={fetchData}><FaDownload size={20} color="black" />Generate</button>
<div className="flex flex-col items-center justify-center">

{fetched && (<div>
 Loading...</div>)}

{data &&

(<div className='mt-7'> 
<img src={data.thumbnail} alt="" className="w-10/12 md:6/12 object-fit mx-auto"/>
<h1 className="font-semibold">{data.name}</h1>
<h2 className='text-black'>{data.duration} in secs</h2>
{

data.formats.filter((ele)=>ele.hasAudio===true).map((filtered,index)=>{return(<a key={index} href={filtered.url} className="bg-slate-300 my-3 flex-row-reverse text-black px-2 py-3 gap-x-3 flex items-center justify-center rounded-lg" target="_blank">{filtered.qualityLabel}
{filtered.hasVideo===false &&
(
<MdAudiotrack size={20} color="black"/>


)


}
{filtered.hasVideo===true &&
(
<MdVideocam size={20} color="black"/>


)


}

</a>)})


}


</div>)


}



</div>



      </div>
  );
}

export default App;

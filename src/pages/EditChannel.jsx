 import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { toast  } from "react-toastify";
import SERVER_URl from "./Config";
const EditChannel =()=>{
    const [channel ,setChannel] = useState({
        name:'',
        url:'',
        logo_url:'',
        category:''
   });
    const { id } = useParams()
    const handleChannel = async()=>
   {  

         try
         {    const result = await axios.get(`http://localhost:5000/api/channel/edit-channel/${id}`,{withCredentials:true});
               setChannel(result.data.result);
         }
         catch(error)
         {
           toast.error(error.response?.data?.message);
               
         }
        
    }
      const changeInput =(e)=>{
        const {name,value} = e.target;
        setChannel((prev)=>
      ({
          ...prev,
          [name]:value
        
      }));

   }
   useEffect(()=>{
            handleChannel();
      },[]);

    const updateCahnnel =async(e)=>
        {
            e.preventDefault();
            try{
            const result = await axios.post(SERVER_URl +'api/channel/update-channel/'+id,channel,{withCredentials:true});
            console.log(result.data.result);
              toast.success(result.data.message);
            }
            catch(error)
            {
                console.log(error);
            }
    }
    return(<div>
        <Header/>
         <div className="container bg-dark-light mt-5">
          <div className="row">

         
             <form className="bg-light px-3" onSubmit={updateCahnnel}>
                  <div className="form-group mb-3">
                    <label htmlFor="channelName">Channel Name</label>
                    <input type="text" name="name" value={channel.name} className="form-control" id="channelName" onChange={changeInput}/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="channelurl">channel Url</label>
                    <input type="text" className="form-control" name="url" value={channel.url} id="channelurl" onChange={changeInput}/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="logourl">logo Url</label>
                    <input type="text" className="form-control" name="logo_url" value={channel.logo_url} id="logourl" onChange={changeInput}/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={channel.category} onChange={changeInput}/>
                  </div>
                  
                  <button type="submit" className="btn btn-secondary border-2 mt-3  mb-2">Submit</button>
                </form>
              </div>
         </div>
        <Footer/>
    </div>);
}
export default EditChannel;
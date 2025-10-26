 import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { toast  } from "react-toastify";
const AddChannel =()=>{
   const [channel ,setChannel] = useState({
        name:'',
        channel_url:'',
        logo_url:'',
        category:''
   });

   const handleChannel = async(e)=>
   {  

         e.preventDefault();
         try
         {
              const result = await axios.post('http://localhost:5000/api/channel/add-channel',channel,{withCredentials:true});
               setChannel({ name: "", channel_url: "",logo_url:'',category:'' });
               toast.success(result.response?.data?.message);
         }
         catch(error)
         {
           toast.error(error.response?.data?.message);
           setChannel({ name: "", channel_url: "",logo_url:'',category:'' });
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
    return(<>
        <Header/>
         <div className="container bg-dark-light mt-5">
          <div className="row">

         
             <form className="bg-light px-3" onSubmit={handleChannel}>
                  <div className="form-group mb-3">
                    <label htmlFor="channelName">Channel Name</label>
                    <input type="text" name="name" value={channel.name} className="form-control" id="channelName" onChange={changeInput}/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="channelurl">channel Url</label>
                    <input type="text" className="form-control" name="channel_url" value={channel.channel_url} id="channelurl" onChange={changeInput}/>
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
    </>);
}
export default AddChannel;
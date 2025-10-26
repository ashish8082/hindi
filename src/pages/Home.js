import Header from "./Header";
import Footer from "./Footer";
import JwPlayer from "./JwPlayer";
import axios from "axios";
import SERVERURl from "./Config.jsx";
import { useState,useEffect } from "react";
import HlsPlayer from "./HlsPlayer.jsx";
import data from "./data.json";
const Home =()=>{
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/9xm/23886666-8fc5-470f-aab1-bd637ed607b1/3.m3u8");

  const getChannel =  async()=>{
       try{
          const result = await axios.get("https://raw.githubusercontent.com/ashish8082/channel/refs/heads/master/index.m3u",{withCredentials:false});
         
          const lines = result.data.split("\n");
          let Data = [];
          for (let i = 0; i < lines.length; i++) 
          {
             const line = lines[i].trim();
              if (line.startsWith("#EXTINF")) 
              {
                 const idMatch = line.match(/tvg-id="([^"]+)"/);
                 const id = idMatch ? idMatch[1] : "";
                 const name = line.split(",")[1] || "Unknown";
                 const url = lines[i + 1]?.trim();

                  if (url && url.startsWith("http")) 
                  {
                    Data.push({ id, name, url });
                  }

              }

          }
          setChannels(Data);
         
       }
       catch(error)
       {
           console.error("Error fetching channels:", error);
       }
  }
  useEffect(() => 
  {
    getChannel();
  }, []);
  
  const changeChannel =(channel) =>{
      setCurrentChannel(channel);
  }

  return(
    <> 
    <Header/>
          <div className="container-fluid mt-3">
              <div className="row">
                 <div className="col-md-9 bg-dark">
                  {currentChannel && (
                   
                       <HlsPlayer src={currentChannel} />
                  //  <JwPlayer  file={currentChannel}    />
                  )}
                 </div>
                 <div className="col-12 col-md-3 aspect-box-channel">
                    <h3 className="bg-dark text-white text-center py-2">Channel List</h3>
                   <ul className="card list-group">
                    
                    {channels && channels.map((channel, index) => 
                    (
                      <li className="card-body list-group-item d-flex justify-content-between align-items-center" key={index} >{channel.name}
                          <button className="btn btn-dark" onClick={()=>changeChannel(channel.url)} >Play</button>
                      </li>
                       
                    ))}
                   </ul>
                   
                 </div>
              </div>
          </div>
             
     
    <Footer/>
    </>
   
  );
}
export default Home;
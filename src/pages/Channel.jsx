import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import SERVER_URl from "./Config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Channel = () => {
  const [channelData, setChannelData] = useState([]); // Initialize as array
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const getChannel = async () => {
    const result = await axios.get(SERVER_URl + "api/channel/all-channel", {
      withCredentials: true,
    });
    setChannelData(result.data.result);
  };

  useEffect(() => {
    getChannel();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = channelData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(channelData.length / itemsPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const changelStatus =async(id)=>{
    const result = await axios.get(SERVER_URl + "api/channel/change-status/"+id, {
      withCredentials: true,
    });
    console.log(result);
    toast.success(result.data.message);
    getChannel();
  }

  const editChannel =async(id)=>{
        const result = await axios.get(SERVER_URl + "api/channel/edit-channel/"+id, {
      withCredentials: true,
    });
    navigate('/edit-channel/'+id);
  }
  return (
    <div>
      <Header />
      <div className="container bg-dark mt-5 mb-5">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Logo</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((channel, index) => (
                <tr key={channel._id}>
                  <th>{indexOfFirstItem + index + 1}</th>
                  <th>
                    <img
                      src={channel.logo_url}
                      alt={channel.name}
                      style={{ width: "100px" }}
                    />
                  </th>
                  <th>{channel.name}</th>
                  <th>{channel.category}</th>
                  <th>{channel.status ? "Active" : "InActive"}</th>
                  <th className="justify-center me-auto">
                    <button className="btn btn-primary rounded-1 me-2" onClick={()=>changelStatus(channel._id)}>
                      Change Status
                    </button>
                    <button className="btn btn-dark rounded-1" onClick={()=>editChannel(channel._id)}>Edit</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3 mb-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handleClick(i + 1)}
                className={`btn me-2 ${
                  currentPage === i + 1 ? "btn-primary" : "btn-secondary"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Channel;

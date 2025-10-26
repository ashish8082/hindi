 import React from "react";
 import { Link } from "react-router-dom";
 const Header =()=>{
   return(
    <nav className="navbar bg-primary  navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/"> Live Tv</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="#">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="#">Movies</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link text-white" href="#">News</Link>
            </li>
          </ul>
          <div className="d-flex">
                
          </div>
        </div>
      </div>
    </nav>
   );
}
export default Header
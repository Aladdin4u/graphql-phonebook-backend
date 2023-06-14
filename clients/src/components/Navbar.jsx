import { useState } from "react";

const NavBar = ({ onShow }) => {

  return (
    <nav>
        <div className="nav-logo"></div>
      <h2 className="nav-title">Phone</h2>
      <button className="nav-icon" onClick={onShow}>+</button>
    </nav>
  );
};

export default NavBar;

import React, { Component } from "react";
import { Drawer, Button } from "antd";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="navBar">
        <Link to="/">
          <h1>PoinTâche</h1>
        </Link>
        <div className="linkListe">
          <Link to="/login">
            <Button className="linkbtn">Log In</Button>
          </Link>
          <Link to="/register">
            <Button className="linkbtn">Sign Up</Button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

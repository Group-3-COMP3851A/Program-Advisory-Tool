import React from "react";
import logo from '../assets/logo.png';
import Link from './Link.js';
import '../styles/style.css';

//Written by Jarod 22/08

function Menu() {
	return(
		 <div className="menu">
      <img src={logo} alt="UoN Logo" className="menu-logo" />
      <ul className="menu-list">
        <li><Link to="/profile" text="Profile" /></li>
        <li><Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /></li>
        <li><Link to="/completed" text="Completed" /></li>
        <li><Link to="/plan" text="Plan" /></li>
        <li><Link to="/select" text="Create new planner" /></li>
        <li ></li>
      </ul>
        <ul className='logout' >
            <li><Link to="/logout"text="Logout" /> </li>
        </ul>
    </div>
  );
}


export default Menu;
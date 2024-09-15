import React from "react";
import logo from '../assets/logo.png';
import Link from './Link.js';

//Written by Jarod 22/08

function Menu() {
	return(
		<div className="menu">
			<img src={logo} alt="UoN Logo"/>
			<ul>
			    <li><Link to="/select" text="Create new planner"/></li>
                <li><Link to="/profile" text="Profile" /></li>
                <li><Link to="/view-planner" text="View Planner" /></li>
                <li><Link to="/logout" text="Logout" /></li>
                <li><Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /></li>
			</ul>
		</div>
	);
}

export default Menu;
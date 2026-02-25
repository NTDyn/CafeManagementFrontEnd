// import edit from '../../../assets/profile/editDropdown.png';
import inbox from '../../../../image/client/profile/envelope.png';
import settings from '../../../../image/client/profile/settings.png';
import help from '../../../../image/client/profile/question.png';
import logout from '../../../../image/client/profile/log-out.png';
import user from "../../../../image/client/profile/ava.png"

import './DropdownProfile.css';

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DropdownProfile() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  // User information from local storage
  const userLogin = JSON.parse(localStorage.getItem('@userLogin') || '{}')
  const nameUser = userLogin.customer_Name || '';
  // const roleUser = (userLogin.user.role)

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger mobile' onClick={() => { setOpen(!open) }}>
          <img src={user} alt='img'></img>
        </div>

        <div className={`dropdown-menu-profile mobile ${open ? 'active' : 'inactive'}`} >
          <h3 className='profile-title text-center' style={{ marginLeft: '-0.5rem' }}>{nameUser}</h3>
          {/* <p className='profile-status'>{roleUser}</p> */}
          <ul className='dropdown-list-item'>
            <DropdownItem img={user} text={"My Profile"} link={"/client/profile"} />
            {/* <DropdownItem img = {edit} text = {"Edit Profile"} link = {"/"}/> */}
            <DropdownItem img={inbox} text={"Inbox"} link={"/client/chat"} />
            <DropdownItem img={settings} text={"Settings"} link={"#"} />
            <DropdownItem img={help} text={"Helps"} link={"#"} />
            <DropdownItem img={logout} text={"Logout"} link={"/client/login"}
              onClick={() => {
                localStorage.removeItem('@userLogin')
                localStorage.removeItem('@userRole')
              }} />
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ img, link, onClick, text }) {
  return (
    <li className='dropdownItem'>
      <img src={img} alt='img'></img>
      <Link to={link} onClick={onClick}>{text}</Link>
    </li>
  );
}

export default DropdownProfile;

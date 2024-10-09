import React from 'react'
import { LuMenu } from "react-icons/lu";
import avatar from '../../assets/avatar.png';
import './Navbar.css';
import { FaPlus } from "react-icons/fa";


function Navbar() {
  return (
    <>
        <div className='navbar'>
          <nav>
              <ul>
                  <p><img src={avatar} alt='avatar'/></p>
              </ul>
          </nav>
          <div className='new_distribuutor'>
                  <button><FaPlus/><p>Add New</p></button>
          </div>
        </div>

    </>
  )
}

export default Navbar
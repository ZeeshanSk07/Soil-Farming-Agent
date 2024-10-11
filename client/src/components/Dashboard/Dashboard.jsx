import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {getSoils} from '../../apis/soil';

function Dashboard() {
  const arr = [
    {
      soil: "Clay",
      color: "gray",
      distributor: "animesh distributor",
      location: "near tiranga chowk",
    },
    {
      soil: "Sandy",
      color: "brown",
      distributor: "vijay distributor",
      location: "near kotla",
    },
    {
      soil: "Loamy",
      color: "yellow",
      distributor: "ashok distributor",
      location: "near gokul nagar",
    },
    {
      soil: "Cultivated",
      color: "green",
      distributor: "ravi distributor",
      location: "near rajdhani",
    },
    {
      soil: "Waterlogged dkkkkkkkkkkkk",
      color: "black",
      distributor: "rakesh distributor",
      location: "near kashmir",
    },
    {
      soil: "Saline",
      color: "blue",
      distributor: "prakash distributor",
      location: "near hindu nagar",
    },
    {
      soil: "Fertile",
      color: "red",
      distributor: "sudhir distributor",
      location: "near kalki nagar",
    },
  ];

  const [token, setToken] = useState('');
  const [soils, setSoils] = useState([]);

  useEffect(() => {
    const fetchSoils = async () => {
      const tok = localStorage.getItem('token');
      setToken(tok);
      try {
        const allsoil = await getSoils(tok);  
        console.log(allsoil.data); 
        if(allsoil.status === 200){
          setSoils(allsoil.data);
          console.log('Soils fetched successfully:', soils);
        }else {
          console.log('Error fetching soils:', allsoil.data.message);
        }
      } catch (error) {
        console.log('Error fetching soils:', error);
      }
    };
  
    fetchSoils();
  }, [soils])
  
  return (
    <div className="dashboard">
      <div className="content">
        {(soils || []).map((i, index) => {
          return (
            <div
              key={index}
              className="table"
            >
              <div className="col">
                <div className="title"><FaChevronCircleRight size={20} /><span> {i.name}</span></div>
                <div className="color">{i.color} color</div>
              </div>

              
                
                <div className="col distributor">
                  <span><FaDotCircle size={10}/> Distributor :</span>
                  <div>{i.distributor}</div>
                  <div>{i.location}</div>
                </div>

                <div className="edit">
                  <span><RiEdit2Fill/></span>
                  <span><MdDelete /></span>
                </div>
            </div>
           
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;

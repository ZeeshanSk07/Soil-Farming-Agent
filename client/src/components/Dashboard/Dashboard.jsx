import React, { useEffect, useRef } from "react";
import "./Dashboard.css";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

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

  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.3}s`; // Stagger animation by index
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="content">
        {arr.map((i, index) => {
          return (
            <div
              key={index}
              className="table"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="col">
                <div className="title"><FaChevronCircleRight size={20} /><span> {i.soil}</span></div>
                <div className="color">{i.color} color</div>
              </div>

              
                
                <div className="col distributor">
                  <span><FaDotCircle size={10}/> Distributor :</span>
                  <div>{i.distributor}</div>
                  <div>{i.location}</div>
                </div>

                <div>
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
